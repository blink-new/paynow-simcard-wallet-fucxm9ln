import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Phone, Mail, Clock } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { blink } from '../blink/client'

interface ChatMessage {
  id: string
  type: 'user' | 'bot' | 'agent'
  message: string
  timestamp: string
  sender?: string
}

const LiveChatSupport: React.FC = () => {
  const { t, language } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: language === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟' : 'Hello! How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatMode, setChatMode] = useState<'bot' | 'agent'>('bot')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickReplies = [
    { id: 'card_help', text: t('cardHelp'), message: 'I need help with my virtual card' },
    { id: 'transaction_issue', text: t('transactionIssue'), message: 'I have a transaction issue' },
    { id: 'account_balance', text: t('accountBalance'), message: 'Check my account balance' },
    { id: 'speak_agent', text: t('speakToAgent'), message: 'I want to speak to a human agent' }
  ]

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase()
    
    if (msg.includes('card') || msg.includes('virtual')) {
      return language === 'ar' 
        ? 'يمكنك إنشاء بطاقة افتراضية جديدة من خلال الذهاب إلى قسم "البطاقات" واختيار مصدر التمويل المفضل لديك.'
        : 'You can generate a new virtual card by going to the "Cards" section and selecting your preferred funding source.'
    }
    
    if (msg.includes('balance') || msg.includes('money')) {
      return language === 'ar'
        ? 'رصيدك الحالي هو 450 درهم إماراتي. يمكنك عرض تفاصيل أكثر في لوحة التحكم الرئيسية.'
        : 'Your current balance is AED 450. You can view more details in your main dashboard.'
    }
    
    if (msg.includes('transaction') || msg.includes('payment')) {
      return language === 'ar'
        ? 'يمكنك عرض جميع معاملاتك في قسم "السجل". إذا كان لديك مشكلة في معاملة معينة، يرجى تقديم رقم المعاملة.'
        : 'You can view all your transactions in the "History" section. If you have an issue with a specific transaction, please provide the transaction ID.'
    }
    
    if (msg.includes('agent') || msg.includes('human') || msg.includes('help')) {
      setChatMode('agent')
      return language === 'ar'
        ? 'جاري تحويلك إلى أحد ممثلي خدمة العملاء. يرجى الانتظار...'
        : 'Connecting you to a customer service agent. Please wait...'
    }
    
    return language === 'ar'
      ? 'شكراً لك على رسالتك. كيف يمكنني مساعدتك أكثر؟'
      : 'Thank you for your message. How can I assist you further?'
  }

  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: text,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot/agent response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: chatMode,
        message: chatMode === 'bot' ? getBotResponse(text) : 'Thank you for contacting us. An agent will be with you shortly.',
        timestamp: new Date().toISOString(),
        sender: chatMode === 'agent' ? 'Sarah (Support Agent)' : undefined
      }
      
      setMessages(prev => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-AE', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-40"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                {chatMode === 'bot' ? (
                  <Bot className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">
                  {chatMode === 'bot' ? t('payNowAssistant') : t('customerSupport')}
                </h3>
                <p className="text-sm text-white/80">
                  {chatMode === 'bot' ? t('onlineNow') : t('agentConnected')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.sender && (
                    <p className="text-xs font-medium mb-1 opacity-80">
                      {message.sender}
                    </p>
                  )}
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">{t('quickHelp')}:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => sendMessage(reply.message)}
                    className="text-xs p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-left"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={t('typeMessage')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim()}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Contact Options */}
          <div className="p-3 bg-gray-50 rounded-b-xl border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+971-4-123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>support@paynow.ae</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>24/7</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LiveChatSupport