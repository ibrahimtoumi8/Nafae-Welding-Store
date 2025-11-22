
import React, { useState } from 'react';
import { products } from '../data';
import { Product } from '../types';
import { Eye, ShoppingCart, Search, ChevronRight, ChevronLeft, Image as ImageIcon } from 'lucide-react';

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

// مكون فرعي لبطاقة المنتج مع ألبوم صور داخلي
const ProductCard = ({ product, onClick, onAdd }: { product: Product, onClick: () => void, onAdd: () => void }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-transparent dark:border-gray-700 h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* منطقة الصورة مع السلايدر */}
            <div className="relative h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img 
                    src={product.images[currentImageIndex]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500"
                    onClick={onClick} // عند الضغط على الصورة نذهب للتفاصيل
                    style={{ cursor: 'pointer' }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                />
                
                {/* شارة التخفيض */}
                {product.oldPrice && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                        تخفيض
                    </div>
                )}

                {/* أزرار التنقل (تظهر فقط إذا كان هناك أكثر من صورة) */}
                {product.images.length > 1 && (
                    <>
                        <div className={`absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>
                            <button 
                                onClick={nextImage}
                                className="bg-black/50 hover:bg-black/70 text-white p-1 rounded-full backdrop-blur-sm transition transform hover:scale-110"
                            >
                                <ChevronRight size={20} />
                            </button>
                            <button 
                                onClick={prevImage}
                                className="bg-black/50 hover:bg-black/70 text-white p-1 rounded-full backdrop-blur-sm transition transform hover:scale-110"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        </div>
                        
                        {/* مؤشر الصور (النقاط) */}
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                            {product.images.map((_, idx) => (
                                <div 
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                                        idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* أيقونة توضح أن المنتج يحتوي على ألبوم */}
                {product.images.length > 1 && (
                    <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
                        <ImageIcon size={10} />
                        <span>{product.images.length} صور</span>
                    </div>
                )}
            </div>

            {/* تفاصيل المنتج */}
            <div className="p-5 flex-grow flex flex-col">
                <div onClick={onClick} className="cursor-pointer">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                        {product.description}
                    </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        {product.oldPrice && (
                            <p className="text-xs text-gray-400 line-through font-medium">
                                {product.oldPrice.toLocaleString()} د.ج
                            </p>
                        )}
                        <p className="text-lg font-extrabold text-primary">
                            {product.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">د.ج</span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={onClick}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                            title="التفاصيل"
                        >
                            <Eye size={20} />
                        </button>
                        <button 
                            onClick={onAdd}
                            className="p-2 text-white bg-primary hover:bg-primary-dark rounded-full shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1 active:translate-y-0"
                            title="أضف للسلة"
                        >
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="products">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        منتجاتنا المميزة
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        تصفح أحدث تصاميم الأبواب والنوافذ المصنوعة بأعلى معايير الجودة
                    </p>
                </div>
                
                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-10 relative group">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pr-12 pl-4 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition shadow-sm group-hover:shadow-md"
                        placeholder="ابحث عن منتج (مثال: باب فاخر، نافذة...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:-translate-y-1
                                ${activeCategory === cat.id 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900' 
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id}
                                product={product}
                                onClick={() => onProductClick(product)}
                                onAdd={() => onAddToCart(product)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                            <Search className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">لا توجد نتائج</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">لم نعثر على أي منتجات تطابق "{searchQuery}".</p>
                        <button 
                            onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                            className="text-primary font-bold hover:underline bg-primary/10 px-6 py-2 rounded-full transition-colors"
                        >
                            إظهار جميع المنتجات
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductList;
