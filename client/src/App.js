import React, { useState, useEffect, useRef } from 'react';

// Mock icons (same as your originals)
const Send = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M11 11 22 2"/></svg>;
const User = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const Bot = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4"/><path d="M16 8V4"/><path d="M8 8V4"/><path d="M18 10a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0v1z"/><path d="M6 10a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0v1z"/><path d="M14 17h-4a4 4 0 1 1 4-4v4z"/><circle cx="12" cy="19" r="2"/></svg>;

// --- DUMMY DATA (kept your original examples but simplified) ---
const initialMessages = [
  { id: 1, text: "Hello! I'm your Dark Theme AI assistant. I'm now using a beautiful teal and deep blue palette. How can I help you today?", sender: 'ai', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  { id: 2, text: "Can you briefly explain the concept of 'zero-shot learning' in natural language processing?", sender: 'user', timestamp: new Date(Date.now() - 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  { id: 3, text: "Zero-shot learning (ZSL) is a machine learning paradigm where a model is expected to handle tasks or classify data points that were not present during training. In NLP, this means the model can correctly answer questions or categorize text for unseen classes by relying on auxiliary information, such as the textual description of the new class or task, effectively generalizing its understanding without any direct labeled examples.", sender: 'ai', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
];

// Message component — preserves original layout + adds fade-in
const Message = ({ message }) => {
  const isAI = message.sender === 'ai';

  const aiStyle = 'bg-[#2E4F4F] text-[#CBE4DE] border border-[#0E8388]/20 shadow-md';
  const userStyle = 'bg-[#0E8388] text-[#CBE4DE] ml-auto border border-[#0E8388] shadow-md';
  const messageClass = isAI ? aiStyle : userStyle;

  const icon = isAI
    ? <Bot className="w-5 h-5 text-[#0E8388]" />
    : <User className="w-5 h-5 text-[#CBE4DE]" />;

  const alignment = isAI ? 'justify-start' : 'justify-end';

  return (
    <div className={`flex ${alignment} mb-6 animate-message-fade`}>
      <div className={`flex items-start max-w-xl lg:max-w-3xl ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAI ? 'bg-[#2E4F4F] mr-2 border border-[#0E8388]/50' : 'bg-[#0E8388] ml-2 border border-[#0E8388]'}`}>
          {icon}
        </div>

        <div className={`p-4 rounded-xl transition-colors duration-300 ${messageClass} ${isAI ? 'rounded-tl-lg' : 'rounded-tr-lg'}`}>
          <p className="text-l leading-relaxed whitespace-pre-wrap">{message.text}</p>
          <span className={`block text-xs mt-2 ${isAI ? 'text-gray-400' : 'text-[#CBE4DE] opacity-80'} text-right`}>
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

// Lightweight typing indicator, matches your bubble sizes and colors
const TypingIndicator = ({ isAI }) => (
  <div className={`${isAI ? 'justify-start' : 'justify-end'} flex mb-6`}>
    <div className={`flex items-start max-w-xl lg:max-w-3xl ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAI ? 'bg-[#2E4F4F] mr-2 border border-[#0E8388]/50' : 'bg-[#0E8388] ml-2 border border-[#0E8388]'}`}>
        {isAI ? <Bot className="w-5 h-5 text-[#0E8388]" /> : <User className="w-5 h-5 text-[#CBE4DE]" />}
      </div>
      <div className={`p-3 rounded-xl ${isAI ? 'bg-[#2E4F4F]' : 'bg-[#0E8388] text-[#CBE4DE]'} border border-[#0E8388]/20`}>
        <div className="flex items-center space-x-1">
          <span className="typing-dot" />
          <span className="typing-dot delay-100" />
          <span className="typing-dot delay-200" />
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // preserve original scroll behavior
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newUserMessage = {
      id: Date.now(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated AI reply (kept same timing as original, minor tweak)
    setTimeout(() => {
      const aiResponseText = generateAIResponse(trimmedInput);
      const newAIMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newAIMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return "Greetings! I'm ready to start a conversation. Ask me something that requires a concise, factual answer.";
    }
    if (lowerQuery.includes('complexity') || lowerQuery.includes('design')) {
      return "This fixed dark theme prioritizes visual depth and readability. The use of #2C3333 for the background and #CBE4DE for text provides excellent contrast, while the accent color #0E8388 highlights interactive elements beautifully.";
    }
    if (lowerQuery.includes('gemini')) {
      return "Gemini is a family of multimodal models designed by Google. I am currently running on a simulated API structure to demonstrate chat functionality in this application.";
    }
    return `Searching for a concise, direct answer regarding: "${query}". Please allow me a moment to synthesize the information. Thank you for using this fixed dark theme assistant.`;
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 font-sans bg-[#2C3333] text-[#CBE4DE]`}>
      <div className="flex-1 flex flex-col w-full mx-auto max-w-5xl">
        <header className="flex-shrink-0 p-4 border-b border-[#2E4F4F] flex justify-between items-center bg-[#2C3333] sticky top-0 z-10 shadow-lg shadow-black/20">
          <div className="flex items-center text-xl font-bold text-[#CBE4DE]">
            <Bot className="w-6 h-6 mr-2 text-[#0E8388]" />
            <span className="hidden sm:inline">AI Assistant (Dark Theme)</span>
            <span className="sm:hidden">AI Assistant</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pt-8 pb-32 px-4 sm:px-6 md:px-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg) => <Message key={msg.id} message={msg} />)}
            {isTyping && <TypingIndicator isAI={true} />}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-[#2C3333] bg-opacity-95 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSend} className="flex space-x-3 p-2 bg-[#2E4F4F] rounded-2xl shadow-xl border border-[#0E8388]/50" aria-label="Send message form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 p-3 text-base outline-none bg-[#2E4F4F] text-[#CBE4DE] transition-all duration-200 placeholder-gray-400 rounded-lg"
                autoFocus
                aria-label="Message input"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-[#0E8388] text-[#CBE4DE] rounded-xl shadow-lg hover:bg-[#0E8388]/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-medium transform active:scale-95"
                disabled={!input.trim()}
                aria-label="Send message"
                title="Send message"
              >
                <Send className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Ask</span>
              </button>
            </form>
            <p className="text-xs text-center text-gray-500 mt-2">
                AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </footer>
      </div>

      {/* Keep your original custom scrollbar and add small CSS for fade + typing dots */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #0E8388;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #0E838890;
        }

        /* Subtle fade-in for messages (keeps it lightweight) */
        @keyframes msgFade {
          from { opacity: 0; transform: translateY(8px) scale(0.995); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-message-fade {
          animation: msgFade 220ms ease forwards;
        }

        /* Typing dot styles */
        .typing-dot {
          width: 7px;
          height: 7px;
          background: #CBE4DE;
          border-radius: 999px;
          display: inline-block;
          opacity: 0.25;
          transform: translateY(0);
          animation: typingBounce 900ms infinite ease-in-out;
        }
        .typing-dot.delay-100 { animation-delay: 120ms; }
        .typing-dot.delay-200 { animation-delay: 240ms; }

        @keyframes typingBounce {
          0% { opacity: 0.25; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 0.25; transform: translateY(0); }
        }

        /* Ensure chat's main container never expands beyond original max width */
        .max-w-5xl { max-width: 80rem; } /* Tailwind's 5xl default preserved */
      `}</style>
    </div>
  );
};

export default App;
