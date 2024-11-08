"use client";
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import "./Style.css"

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode and save to local storage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme from local storage on page load
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    }
  }, []);

  // Save theme preference to local storage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Hello! How can I assist you?' },
        ]);
      }, 500);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-gray-100 to-indigo-200'}`}>
      <div className={`w-full max-w-4xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-3xl p-8`}>
        <h2 className={`text-4xl font-semibold text-center ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
          Chatbot Assistant
        </h2>

        {/* Dark/Light Mode Toggle Icon */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none"
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6 text-blue-400" />
          )}
        </button>

        {/* Chat messages container */}
        <div className="flex flex-col space-y-4 h-96 overflow-y-auto p-6 mb-6 border border-gray-200 rounded-2xl bg-gray-50 shadow-inner custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Label for bot */}
              {message.sender === 'bot' && (
                <span className="text-sm font-medium text-gray-600 mr-2">AI</span>
              )}
              <p
                className={`${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                } px-5 py-3 rounded-lg shadow-sm max-w-xl transition-all duration-200`}
              >
                {message.text}
              </p>
              {/* Label for user */}
              {message.sender === 'user' && (
                <span className="text-sm font-medium text-gray-600 ml-2">Me</span>
              )}
            </div>
          ))}
        </div>

        {/* Input and Send Button */}
        <div className="flex space-x-4">
          <input
            type="text"
            className={`flex-1 p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200`}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className={`px-8 py-4 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-indigo-400 transition-all duration-200`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
