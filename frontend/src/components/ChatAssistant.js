import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { sendChatMessage } from '../services/api';
import '../styles/ChatAssistant.css';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am DataQualityAI. Analyze a file, then ask me anything about it.' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput("");
    setIsTyping(true);

    const reply = await sendChatMessage(userMsg);
    
    setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    setIsTyping(false);
  };

  return (
    <div className="chat-widget">
      {/* 1. Floating Action Button (FAB) */}
      {!isOpen && (
        <button className="chat-fab pulse-anim" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
          <span className="fab-label">Ask AI</span>
        </button>
      )}

      {/* 2. Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-title">
              <Bot size={18} className="ai-icon"/>
              <span>DataQualityAI</span>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {msg.sender === 'ai' && <Bot size={16} className="msg-icon"/>}
                <div className="msg-content">{msg.text}</div>
              </div>
            ))}
            {isTyping && <div className="typing-indicator">AI is thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <input 
              type="text" 
              placeholder="Ask about risks..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}><Send size={16} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;