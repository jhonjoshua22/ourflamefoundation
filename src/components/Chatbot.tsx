import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[450px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flame-gradient p-4 flex justify-between items-center text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-bold">Flame Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-lg p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-background/50 text-sm">
            <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%] mb-4">
              Hi there! How can the Flame team help you today?
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full pl-4 pr-10 py-2 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-flame-orange/50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-flame-orange hover:scale-110 transition-transform">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flame-gradient p-4 rounded-full shadow-lg hover:scale-110 hover:rotate-12 transition-all duration-300 group"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-7 h-7 text-primary-foreground group-hover:fill-current" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;
