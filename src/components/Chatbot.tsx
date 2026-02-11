import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Flame } from "lucide-react";

const FAQS = [
  {
    question: "How can stuff be free here?",
    answer: "It’s a membership program! Richer partners cover costs for those in need via gifts, donations, barter, mentoring, and investment. We take care of each other."
  },
  {
    question: "What are the prices?",
    answer: "We offer optional subscriptions for better-off members. These values are equivalent to the support provided to all members, ensuring fairness across the board."
  },
  {
    question: "Why do we need this?",
    answer: "Because bad people have too much power to hurt the innocent, and most people are too stressed to help. We are here to protect."
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "model", content: "Hello! I'm the Flame Assistant. Click a question below to learn more about our mission! 🔥" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleQuestionClick = (faq: typeof FAQS[0]) => {
    // Add User Question and then the auto-response
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: faq.question },
      { role: "model", content: faq.answer }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-[320px] md:w-[380px] h-[500px] bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <h1 className="text-white font-bold text-sm">Flame FAQ Guide</h1>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === "user" 
                      ? "bg-orange-600 text-white rounded-tr-none" 
                      : "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* FAQ Options (The "Input" area replacement) */}
          <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 space-y-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">Select a topic:</p>
            {FAQS.map((faq, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(faq)}
                className="w-full text-left text-xs bg-zinc-950 border border-zinc-700 hover:border-orange-500/50 text-zinc-300 hover:text-white p-2 rounded-lg transition-all"
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-600 hover:bg-orange-500 p-4 rounded-full shadow-lg text-white transition-all hover:scale-105"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
}
