import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { generateUniqueId } from '@/utils/helpers';

// Define the shape of our message objects
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// Define the shape of our context
interface AIContextProps {
  messages: Message[];
  isLoading: boolean;
  language: 'en' | 'hi';
  voiceEnabled: boolean;
  currentMode: string;
  chatHistory: boolean;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
  toggleLanguage: () => void;
  toggleVoice: () => void;
  setCurrentMode: (mode: string) => void;
  clearHistory: () => void;
  speakMessage: (text: string) => void;
}

// Create the context with default values
const AIContext = createContext<AIContextProps>({
  messages: [],
  isLoading: false,
  language: 'en',
  voiceEnabled: true,
  currentMode: 'default',
  chatHistory: true,
  sendMessage: () => {},
  clearMessages: () => {},
  toggleLanguage: () => {},
  toggleVoice: () => {},
  setCurrentMode: () => {},
  clearHistory: () => {},
  speakMessage: () => {},
});

// Sample AI responses for demonstration
const sampleResponses = {
  default: [
    "I'm your AI assistant. How can I help you today?",
    "That's an interesting question. Let me think about it...",
    "I'm here to assist you with any questions you may have.",
    "I don't have all the answers, but I'll do my best to help.",
  ],
  deep: [
    "That's a profound question. Philosophers have debated this for centuries...",
    "When we think about the meaning of existence, several perspectives emerge...",
    "The human experience is complex and multifaceted. Let's explore that together...",
  ],
  math: [
    "Let me solve that equation for you. First, we need to isolate the variables...",
    "The solution to this mathematical problem involves applying these principles...",
    "I can help with this calculation. Here's the step-by-step approach...",
  ],
  knowledge: [
    "According to historical records, this event occurred during...",
    "The scientific consensus on this topic suggests that...",
    "This concept is central to understanding how the world works...",
  ],
  student: [
    "Let me help with your homework. Here's how to approach this problem...",
    "This topic is important for your studies. Let me explain it clearly...",
    "To understand this concept better, let's break it down step by step...",
  ],
  coding: [
    "Here's how you would implement that function in JavaScript:\n```javascript\nfunction example() {\n  // code here\n}\n```",
    "When debugging this issue, check for these common problems...",
    "This programming pattern is useful because it solves problems like...",
  ],
  fun: [
    "Here's a joke you might enjoy: Why don't scientists trust atoms? Because they make up everything!",
    "Let me tell you an interesting riddle: What has keys but no locks, space but no room, and you can enter but not go in?",
    "Did you know? The shortest war in history was between Britain and Zanzibar in 1896. It lasted just 38 minutes!",
  ],
  offline: [
    "I'm currently in offline mode with limited functionality. I'll try my best to help with basic questions.",
    "Since we're working offline, I can only provide simple responses. Let me know what you need.",
    "I'm working with reduced capabilities in offline mode. For more comprehensive answers, please connect to the internet.",
  ],
};

// Provider component
export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentMode, setCurrentMode] = useState('default');
  const [chatHistory, setChatHistory] = useState(true);

  // Simulate sending a message and getting a response
  const sendMessage = (content: string) => {
    // Create a new user message
    const userMessage: Message = {
      id: generateUniqueId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    
    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate AI thinking time (1-2.5 seconds)
    setTimeout(() => {
      // Get random response based on current mode
      const responses = sampleResponses[currentMode] || sampleResponses.default;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Create AI message
      const aiMessage: Message = {
        id: generateUniqueId(),
        role: 'assistant',
        content: randomResponse,
        timestamp: Date.now(),
      };
      
      // Add AI message to chat
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      
      // Speak the message if voice is enabled
      if (voiceEnabled && Platform.OS !== 'web') {
        speakMessage(randomResponse);
      }
    }, 1000 + Math.random() * 1500);
  };

  // Clear all messages
  const clearMessages = () => {
    setMessages([]);
  };

  // Toggle language between English and Hindi
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  // Toggle voice feedback
  const toggleVoice = () => {
    setVoiceEnabled((prev) => !prev);
  };

  // Clear chat history
  const clearHistory = () => {
    setMessages([]);
  };

  // Simulated text-to-speech function
  const speakMessage = (text: string) => {
    // In a real implementation, this would use a TTS API
    console.log(`Speaking: ${text}`);
    // Speech synthesis would go here in a real implementation
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        isLoading,
        language,
        voiceEnabled,
        currentMode,
        chatHistory,
        sendMessage,
        clearMessages,
        toggleLanguage,
        toggleVoice,
        setCurrentMode,
        clearHistory,
        speakMessage,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

// Custom hook to use the AI context
export const useAI = () => useContext(AIContext);

export { AIContext }