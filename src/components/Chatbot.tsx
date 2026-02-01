import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Note: Initial greeting has ID "init-greet"
  const [messages, setMessages] = useState<any[]>([
    { role: "model", content: "Hello! I'm your Flame Assistant. 🔥", id: "init-greet" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    const userMessage = { role: "user", content: userText, id: Date.now().toString() };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setInput("");

    try {
      /**
       * CRITICAL FIX: 
       * 1. Filter out the initial greeting (role: model) because Gemini 
       * requires history to start with a 'user' message.
       * 2. We only send previous messages as history. The current 
       * 'userText' is sent separately as the message.
       */
      const history = messages
        .filter(m => m.id !== "init-greet") 
        .map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history }),
      });

      const data = await res.json();
      
      if (data.reply) {
        setMessages((prev) => [
          ...prev, 
          { role: "model", content: data.reply, id: (Date.now() + 1).toString() }
        ]);
      } else {
        throw new Error(data.error || "No response");
      }

    } catch (err: any) {
      setMessages((prev) => [
        ...prev, 
        { role: "model", content: "⚠️ System busy. Please try again.", id: "err" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 h-[450px] bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
            <span className="text-white font-bold">Flame AI</span>
            <X className="cursor-pointer text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-2 rounded-lg max-w-[80%] text-sm ${
                  m.role === "user" ? "bg-orange-600 text-white" : "bg-zinc-800 text-zinc-200"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && <Loader2 className="animate-spin text-orange-500 w-4 h-4 ml-2" />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 border-t border-zinc-800 flex gap-2">
            <input 
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-600" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button 
              type="submit" 
              disabled={isTyping || !input.trim()}
              className="bg-orange-600 p-2 rounded text-white disabled:opacity-50 hover:bg-orange-500"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-orange-600 p-4 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
