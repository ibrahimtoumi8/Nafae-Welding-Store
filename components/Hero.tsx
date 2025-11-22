import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
    onChangeView: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onChangeView }) => {
    return (
        <div className="relative bg-gray-900 text-white overflow-hidden min-h-[500px] flex items-center">
            <div className="absolute inset-0">
                <img 
                    src="https://i.ibb.co/bMN689xz/gas-welding.jpg" 
                    alt="ورشة حدادة فنية وتلحيم ابواب ونوافذ" 
                    className="w-full h-full object-cover opacity-30"
                />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                    نافع للحدادة الفنية <br className="hidden md:block" /> <span className="block mt-2 text-blue-400">أبواب، نوافذ، وديكور عصري</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 mb-10 px-2">
                    أفضل ورشة لتصنيع الأبواب الحديدية (Laser Cut)، ديكورات الأعراس، وتجهيزات المنازل. جودة عالية وتوصيل لجميع ولايات الجزائر.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                    <button 
                        onClick={() => onChangeView('products')}
                        className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                        تصفح المنتجات
                        <ArrowLeft className="mr-2 h-5 w-5" />
                    </button>
                    <button 
                        onClick={() => onChangeView('custom-design')}
                        className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold rounded-lg transition duration-300"
                    >
                        اطلب تصميمك الخاص
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;