import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// This tells the app: "Go to Vercel and grab the secret key I hid there"
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi! I'm your Flame Assistant. How can I help? 🔥" }
  ]);

  const handleChat = async () => {
    if (!input.trim()) return;
    
    // Add what YOU typed to the screen
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const response = await result.response;
      
      // Add what the AI replied to the screen
      setMessages([...newMessages, { role: "model", text: response.text() }]);
    } catch (error) {
      setMessages([...newMessages, { role: "model", text: "Error: Check Vercel Keys!" }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 h-[400px] bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-orange-500 p-4 text-white flex justify-between">
            <span className="font-bold">Flame AI</span>
            <button onClick={() => setIsOpen(false)}><X /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-orange-100" : "bg-gray-100"}`}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input 
              className="flex-1 border p-2 rounded" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChat()}
            />
            <button onClick={handleChat} className="bg-orange-500 text-white p-2 rounded"><Send size={18}/></button>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-500 p-4 rounded-full text-white shadow-lg"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default Chatbot;
