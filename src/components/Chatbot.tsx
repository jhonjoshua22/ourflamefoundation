import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, RotateCcw } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// SECURITY: Always use import.meta.env for keys
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const initialMessage = { 
    role: "model", 
    text: "Hi! I'm your Flame Assistant. How can I help you ignite your potential today? 🔥" 
  };
  
  const [messages, setMessages] = useState([initialMessage]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Function to reset the chat
  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear this conversation?")) {
      setMessages([initialMessage]);
    }
  };

  const handleChat = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are the Flame Foundation Assistant. 
        Focus on Jobs, Money, and Love via the Flame Game Process. 
        Be encouraging, use fire emojis, keep answers concise. 
        Mention Flame Ranks (1-3 and Flame Flyer) when helpful.`
      });

      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: "model", text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [...prev, { role: "model", text: "Sorry, my spark went out. Please check your connection!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-[320px] md:w-[380px] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* Header with Clear Button */}
          <div className="flame-gradient p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-bold tracking-tight text-sm md:text-base">Flame Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={clearChat}
                title="Clear Chat"
                className="hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === "user" 
                    ? "bg-flame-orange text-white rounded-tr-none" 
                    : "bg-muted border border-border rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted border border-border p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-flame-orange" />
                  <span className="text-xs italic text-muted-foreground">Flame is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleChat()}
                placeholder="Ask about Flame Ranks..."
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-flame-orange/50 transition-all text-sm"
              />
              <button 
                onClick={handleChat}
                disabled={isTyping}
                className="absolute right-2 p-2 text-flame-orange hover:scale-110 disabled:opacity-50 transition-transform"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flame-gradient p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;
