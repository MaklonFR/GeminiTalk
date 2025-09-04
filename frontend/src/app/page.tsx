"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo, saya Gemini! Ada yang bisa saya bantu?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-chatbot-gemini-maklonfr.vercel.app'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Maaf, terjadi kesalahan. Silakan coba lagi." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-between min-h-[80vh] rounded-xl shadow-2xl bg-white dark:bg-gray-800 p-4 sm:p-8 mt-8 mb-8">
      <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Gemini Chatbot</h1>
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="flex flex-col gap-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-pink-400 to-indigo-400 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                }`}
              >
                {msg.sender === "bot" ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
                    <ReactMarkdown
                      components={{
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        code: ({inline = false, children, ...props}: {inline?: boolean; children?: React.ReactNode; [key: string]: any}) => {
                          return inline ? (
                            <code className="bg-gray-300 dark:bg-gray-700 px-1 py-0.5 rounded text-xs" {...props}>
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-gray-300 dark:bg-gray-700 p-2 rounded text-xs overflow-x-auto">
                              <code {...props}>{children}</code>
                            </pre>
                          )
                        }
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl max-w-[85%] text-sm shadow-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 mt-auto">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-pink-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 rounded-full text-white font-semibold shadow-md transition-transform ${
            isLoading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105"
          }`}
        >
          {isLoading ? "..." : "Kirim"}
        </button>
      </form>
      <div className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">© 2025 Gemini Chatbot</div>
    </div>
  );
}
