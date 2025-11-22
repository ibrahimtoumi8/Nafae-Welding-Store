import React, { useState } from 'react';
import { products } from '../data';
import { Product } from '../types';
import { Eye, ShoppingCart, Search } from 'lucide-react';

interface ProductListProps {
    onProductClick: (product: Product) => void;
    onAddToCart: (product: Product) => void;
}

const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'doors', name: 'الأبواب' },
    { id: 'windows', name: 'النوافذ' },
    { id: 'wedding', name: 'الأعراس' },
    { id: 'home', name: 'المنزل' },
    { id: 'tools', name: 'أدوات' },
];

const ProductList: React.FC<ProductListProps> = ({ onProductClick, onAddToCart }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesSearch = 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">منتجاتنا المميزة</h2>
                
                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8 relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pr-12 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition shadow-sm"
                        placeholder="ابحث عن منتج (مثال: باب، زفاف...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                                ${activeCategory === cat.id 
                                    ? 'bg-primary text-white shadow-md' 
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-transparent dark:border-gray-700">
                                <div className="relative h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                    <img 
                                        src={product.images[0]} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {product.oldPrice && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            تخفيض
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{product.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">{product.description}</p>
                                    
                                    <div className="mt-auto flex items-center justify-between">
                                        <div>
                                            {product.oldPrice && (
                                                <p className="text-sm text-gray-400 line-through">
                                                    {product.oldPrice.toLocaleString()} د.ج
                                                </p>
                                            )}
                                            <p className="text-xl font-bold text-primary">
                                                {product.price.toLocaleString()} د.ج
                                            </p>
                                        </div>
                                        <div className="flex space-x-2 space-x-reverse">
                                            <button 
                                                onClick={() => onProductClick(product)}
                                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full transition"
                                                title="عرض التفاصيل"
                                            >
                                                <Eye size={20} />
                                            </button>
                                            <button 
                                                onClick={() => onAddToCart(product)}
                                                className="p-2 text-white bg-accent hover:bg-accent-dark rounded-full transition shadow-md"
                                                title="أضف للسلة"
                                            >
                                                <ShoppingCart size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                            <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">لا توجد نتائج</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">لم نعثر على أي منتجات تطابق "{searchQuery}".</p>
                        <button 
                            onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                            className="mt-4 text-primary font-medium hover:underline"
                        >
                            مسح البحث والعودة للكل
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductList;