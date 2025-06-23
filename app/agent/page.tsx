'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function AgentPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/agent'
  });

  const [quickActions] = useState([
    {
      label: "Generate Security Digest",
      prompt: "Generate my daily security digest",
      icon: "📰"
    },
    {
      label: "What is Prompt Injection?",
      prompt: "What is prompt injection?",
      icon: "🔍"
    },
    {
      label: "Explain Zero Trust",
      prompt: "Explain zero trust security",
      icon: "🛡️"
    },
    {
      label: "NIST Framework",
      prompt: "What is the NIST Cybersecurity Framework?",
      icon: "📋"
    }
  ]);

  const handleQuickAction = (prompt: string) => {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'target', {
      value: { elements: { message: { value: prompt } } }
    });
    handleSubmit(event as any);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🛡️ Security Agent
            </h1>
            <p className="text-gray-600">
              AI Assistant with Security Digest and RAG capabilities
            </p>
          </div>

          {/* Quick Actions */}
          {messages.length === 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.prompt)}
                    className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center"
                    disabled={isLoading}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-sm font-medium">{action.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="bg-white rounded-lg shadow-sm border min-h-[400px] flex flex-col">
            <div className="flex-1 p-6 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-16">
                  <div className="text-4xl mb-4">💬</div>
                  <p>Ask me to generate a security digest or search for security knowledge!</p>
                  <p className="text-sm mt-2">Try: "Generate my daily security digest" or "What is prompt injection?"</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span className="text-gray-600">Security Agent is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about security or request a digest..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>Security Agent for AI Bootcamp Assignment 2</p>
            <p>Features: Security News Digest & Cybersecurity Knowledge Search</p>
          </div>
        </div>
      </div>
    </div>
  );
} 