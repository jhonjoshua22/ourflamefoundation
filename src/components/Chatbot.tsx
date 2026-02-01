import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Securely pulls your key from Vercel's Environment Variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi! I'm your Flame Assistant. How can I help you today? 🔥" }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleChat = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are the Flame Foundation Assistant. Be encouraging and help with Jobs, Money, and Love."
      });

      const result = await model.generateContent(input);
      const response = await result.response;
      setMessages((prev) => [...prev, { role: "model", text: response.text() }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "model", text: "Sorry, I'm having trouble connecting. Check Vercel API keys!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[320px] md:w-[380px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
            <span className="font-bold">Flame Assistant</span>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-xl ${msg.role === "user" ? "bg-orange-500 text-white" : "bg-white border text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && <Loader2 className="w-5 h-5 animate-spin text-orange-500" />}
          </div>
          <div className="p-4 border-t bg-white flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              placeholder="Type here..."
              /* ADDED text-black HERE */
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm text-black focus:border-orange-500 bg-white"
            />
            <button onClick={handleChat} className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-orange-600 p-4 rounded-full shadow-lg text-white hover:scale-105 transition-all">
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Chatbot;
