"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "model"; // Gemini uses 'model' instead of 'assistant'
  content: string;
  timestamp: number;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      content: "Hello! I'm your Flame Assistant. How can I help you today? 🔥",
      timestamp: Date.now(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput("");
    setIsTyping(true);

    // 1. Prepare new message objects
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      // 2. Format history for Gemini API
      // We skip the first 'init' message to keep it clean, or include it if you prefer
      const chatHistory = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userText,
          history: chatHistory 
        }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: data.reply,
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: "error-" + Date.now(),
          role: "model",
          content: "⚠️ Connection error. Please check your API key on Vercel.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[320px] md:w-[380px] h-[550px] bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
            <div>
              <h1 className="text-white font-bold text-sm">Flame Assistant</h1>
              <p className="text-[10px] text-zinc-500">Powered by Gemini 🔥</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#0a0a0a]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-orange-600 text-white rounded-tr-none"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none"
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl rounded-tl-none">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-white text-black border border-zinc-700 pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="absolute right-2 p-2 text-orange-600 hover:text-orange-500 disabled:opacity-30"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-orange-600 p-4 rounded-full shadow-lg text-white">
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
};

export default Chatbot;
