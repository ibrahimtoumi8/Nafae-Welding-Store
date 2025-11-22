import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, Loader2, Phone } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { products } from '../data';

interface CustomerServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
}

const CustomerServiceModal: React.FC<CustomerServiceModalProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: 'welcome', 
            role: 'model', 
            text: 'مرحباً بك في ورشة نافع للحدادة الفنية والخدمات المتكاملة! 🛠️✨\n\nنحن ندمج بين الحديد، الألومنيوم، الخشب، والإلكترونيات. كيف يمكنني مساعدتك اليوم؟' 
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatSessionRef = useRef<any>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initialize Chat Session with Context
    useEffect(() => {
        if (isOpen && !chatSessionRef.current) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                // Prepare context from product data
                const productsContext = products.map(p => 
                    `- ${p.name}: سعر ${p.price} د.ج (تصنيف: ${p.category}). الوصف: ${p.description}`
                ).join('\n');

                const systemInstruction = `
                    أنت المساعد الذكي الرسمي لـ "ورشة نافع للحدادة الفنية والخدمات المدمجة".
                    
                    معلومات صاحب المتجر (للحفظ والاسترجاع):
                    - الاسم: نافع تومي (Nafea Toumi).
                    - الهاتف: 0776084097
                    - البريد: nafaetoumi20@gmail.com
                    - العنوان: خنشلة، الجزائر (توصيل لـ 58 ولاية).

                    تخصصات الورشة (مهم جداً):
                    نحن لا نقتصر على الحدادة فقط، بل نتميز بدمج شتى الصناعات في منتج واحد:
                    1. الحدادة الفنية (Laser Cut & Welding).
                    2. نجارة الألومنيوم (نوافذ وأبواب عصرية).
                    3. الخشب (ديكورات مدمجة مع الحديد).
                    4. بديل الرخام (PVC Marble) لتغليف الأبواب والديكورات.
                    5. الإلكترونيات (أنظمة الفتح الآلي للأبواب Smart Gates، الأقفال الذكية، الإضاءة المدمجة).

                    قائمة الأسعار الحالية (أمثلة):
                    ${productsContext}

                    أسلوب المحادثة:
                    - تحدث بلهجة جزائرية مهذبة ومفهومة أو عربية بسيطة جداً.
                    - خطك في الكتابة يجب أن يكون واضحاً ومباشراً.
                    - إذا سأل العميل عن "هل لديكم ألومنيوم؟" أو "باب يفتح وحده؟" أجب بنعم واشرح خبرتنا في دمج الإلكترونيات والمواد الأخرى.
                `;

                chatSessionRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: systemInstruction,
                    }
                });
            } catch (error) {
                console.error("Error initializing AI", error);
            }
        }
    }, [isOpen]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        
        // Add user message immediately
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            if (chatSessionRef.current) {
                const result = await chatSessionRef.current.sendMessage({ message: userMessage });
                const responseText = result.text;
                
                setMessages(prev => [...prev, { 
                    id: (Date.now() + 1).toString(), 
                    role: 'model', 
                    text: responseText 
                }]);
            } else {
                setMessages(prev => [...prev, { 
                    id: (Date.now() + 1).toString(), 
                    role: 'model', 
                    text: "عذراً، الشبكة ضعيفة قليلاً. يرجى الاتصال بنا مباشرة على 0776084097" 
                }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { 
                id: (Date.now() + 1).toString(), 
                role: 'model', 
                text: "حدث خطأ بسيط في الاتصال، هل يمكنك إعادة السؤال؟" 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Modal Container: Full width/height on mobile, specific size on desktop */}
            <div className="bg-white dark:bg-gray-800 w-full md:rounded-2xl rounded-t-2xl shadow-2xl md:max-w-lg h-[85vh] md:h-[650px] flex flex-col overflow-hidden relative transform transition-all scale-100">
                
                {/* Header */}
                <div className="bg-primary p-4 flex justify-between items-center text-white shadow-md z-10 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-full">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold font-['Cairo']">المساعد الذكي - نافع</h2>
                            <p className="text-xs text-blue-100 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                دمج حديد، خشب، إلكترونيك
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-grow overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 space-y-5 transition-colors duration-300">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex w-full ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                        >
                            <div className={`flex max-w-[90%] ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'} gap-2`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white' : 'bg-primary text-white'}`}>
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div 
                                    className={`p-4 rounded-2xl text-lg leading-loose font-['Cairo'] whitespace-pre-wrap shadow-sm ${
                                        msg.role === 'user' 
                                            ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-tr-none' 
                                            : 'bg-primary text-white rounded-tl-none'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex w-full justify-end">
                            <div className="flex flex-row-reverse gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-2xl rounded-tl-none flex items-center">
                                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                    <span className="text-xs text-primary mr-2 font-medium">جاري الكتابة...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-3 md:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2 items-center shrink-0 pb-safe">
                    <button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                        className="p-3 md:p-4 bg-primary text-white rounded-full hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex-shrink-0"
                    >
                        <Send size={20} className={isLoading ? 'opacity-0' : ''} />
                    </button>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-3 md:p-4 bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-700 border focus:border-primary dark:focus:border-primary rounded-full outline-none text-right transition-all placeholder-gray-400 dark:text-white text-base md:text-lg font-['Cairo']"
                        placeholder="اكتب رسالتك هنا..."
                        dir="rtl"
                    />
                </form>
            </div>
        </div>
    );
};

export default CustomerServiceModal;