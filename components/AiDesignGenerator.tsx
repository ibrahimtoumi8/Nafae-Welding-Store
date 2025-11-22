import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Image as ImageIcon, Download, RefreshCw, Wand2, AlertCircle } from 'lucide-react';

interface AiDesignGeneratorProps {
    onUseDesign: () => void; // Callback to navigate to custom order form (optional future use)
}

const styles = [
    { id: 'modern', label: 'عصري (Modern)', prompt: 'modern, minimalist, clean lines, sleek metalwork' },
    { id: 'classic', label: 'كلاسيكي (Classic)', prompt: 'classic, ornate, victorian style, wrought iron details' },
    { id: 'islamic', label: 'زخرفة إسلامية', prompt: 'islamic geometric patterns, arabesque, intricate metal laser cut' },
    { id: 'industrial', label: 'صناعي (Industrial)', prompt: 'industrial style, heavy duty, raw steel look, robust' },
];

const AiDesignGenerator: React.FC<AiDesignGeneratorProps> = ({ onUseDesign }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState(styles[0]);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Construct a specialized prompt for metalwork
            const finalPrompt = `
                Professional architectural visualization of a ${prompt}.
                Style: ${selectedStyle.prompt}.
                Material: Iron, Steel, or Metal. 
                Context: Isolated on a clean background or installed in a nice building facade.
                High quality, photorealistic, 4k, detailed texture of the metal.
                Focus on welding details and craftsmanship.
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: finalPrompt }],
                },
                config: {
                    imageConfig: {
                        aspectRatio: "1:1",
                    }
                }
            });

            let imageFound = false;
            if (response.candidates && response.candidates[0].content.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        const base64EncodeString = part.inlineData.data;
                        const imageUrl = `data:image/png;base64,${base64EncodeString}`;
                        setGeneratedImage(imageUrl);
                        imageFound = true;
                        break;
                    }
                }
            }

            if (!imageFound) {
                throw new Error("لم يتم توليد صورة، الرجاء المحاولة مرة أخرى بوصف مختلف.");
            }

        } catch (err) {
            console.error(err);
            setError("حدث خطأ أثناء توليد التصميم. تأكد من الاتصال بالإنترنت أو حاول مرة أخرى لاحقاً.");
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        if (generatedImage) {
            const link = document.createElement('a');
            link.href = generatedImage;
            link.download = `nafea-design-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <span className="inline-flex items-center px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-bold mb-4">
                    <Sparkles size={16} className="ml-2" />
                    جديد: الذكاء الاصطناعي
                </span>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">مصمم الديكور الذكي</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                    تخيل باب منزلك أو نافذتك، وسنقوم برسمها لك فوراً! 
                    أكتب وصفاً وسيحوله الذكاء الاصطناعي إلى تصميم مرئي.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <form onSubmit={handleGenerate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">ماذا تريد أن تصمم؟</label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="مثال: بوابة خارجية كبيرة سوداء مع زخارف ذهبية على شكل أوراق شجر..."
                                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">اختر نمط التصميم:</label>
                            <div className="grid grid-cols-2 gap-3">
                                {styles.map((style) => (
                                    <button
                                        key={style.id}
                                        type="button"
                                        onClick={() => setSelectedStyle(style)}
                                        className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 flex items-center justify-center
                                            ${selectedStyle.id === style.id 
                                                ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                                                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-gray-600'}`}
                                    >
                                        {style.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]
                                ${loading 
                                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg'}`}
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="animate-spin" size={20} />
                                    جاري التخيل والرسم...
                                </>
                            ) : (
                                <>
                                    <Wand2 size={20} />
                                    توليد التصميم الآن
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Output Section */}
                <div className="bg-gray-900 dark:bg-black/50 rounded-2xl p-1 min-h-[400px] flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                    {generatedImage ? (
                        <div className="relative w-full h-full">
                            <img 
                                src={generatedImage} 
                                alt="AI Design" 
                                className="w-full h-auto rounded-xl shadow-inner object-cover"
                            />
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                                <button 
                                    onClick={downloadImage}
                                    className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg flex items-center hover:bg-gray-100 transition"
                                >
                                    <Download size={18} className="ml-2" />
                                    حفظ الصورة
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-8 text-gray-500">
                            {error ? (
                                <div className="flex flex-col items-center text-red-400">
                                    <AlertCircle size={48} className="mb-4" />
                                    <p>{error}</p>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon size={64} className="mx-auto mb-4 opacity-20" />
                                    <p className="text-gray-400 text-lg">مساحة العمل فارغة</p>
                                    <p className="text-sm text-gray-600 mt-2">اكتب وصفاً واضغط على توليد لرؤية السحر ✨</p>
                                </>
                            )}
                        </div>
                    )}
                    
                    {/* Loading Overlay */}
                    {loading && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-white font-medium animate-pulse">الذكاء الاصطناعي يرسم فكرتك...</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 text-center transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">هل أعجبك التصميم؟</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">يمكننا تنفيذه لك على أرض الواقع! احفظ الصورة وأرسلها لنا في قسم "تصميم خاص".</p>
                <button 
                    onClick={onUseDesign}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition"
                >
                    الانتقال لطلب التسعير
                </button>
            </div>
        </div>
    );
};

export default AiDesignGenerator;