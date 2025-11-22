import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowRight, ShoppingCart, Star, Truck } from 'lucide-react';

interface ProductDetailProps {
    product: Product;
    onBack: () => void;
    onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
    const [mainImage, setMainImage] = useState(product.images[0]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <button 
                onClick={onBack}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition"
            >
                <ArrowRight className="ml-2 h-5 w-5" />
                العودة للمنتجات
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                    
                    {/* Images Section */}
                    <div className="p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
                        <div className="aspect-square rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-inner mb-4">
                            <img 
                                src={mainImage} 
                                alt={product.name} 
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 
                                            ${mainImage === img ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/40 text-primary text-sm font-semibold mb-3">
                                {product.category === 'doors' ? 'أبواب' : 
                                 product.category === 'windows' ? 'نوافذ' : 
                                 product.category === 'wedding' ? 'أعراس' : 'أخرى'}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
                            <div className="flex items-center mb-6">
                                <div className="flex text-yellow-400 ml-2">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">(آراء العملاء)</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                                {product.longDescription}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                            <div className="flex items-end mb-8">
                                {product.oldPrice && (
                                    <span className="text-lg text-gray-400 line-through ml-4">
                                        {product.oldPrice.toLocaleString()} د.ج
                                    </span>
                                )}
                                <span className="text-4xl font-bold text-primary">
                                    {product.price.toLocaleString()} 
                                    <span className="text-lg font-normal text-gray-600 dark:text-gray-400 mr-1">د.ج</span>
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <button 
                                    onClick={() => onAddToCart(product)}
                                    className="flex-1 bg-accent hover:bg-accent-dark text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center transition shadow-lg transform hover:-translate-y-1"
                                >
                                    <ShoppingCart className="ml-2 h-6 w-6" />
                                    أضف إلى السلة
                                </button>
                            </div>
                            
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                <Truck className="ml-2 h-5 w-5 text-primary" />
                                توصيل متوفر لـ 58 ولاية في الجزائر
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;