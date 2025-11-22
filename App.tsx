
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone, Facebook, Briefcase, HeadphonesIcon, Sparkles, Mail, Moon, Sun } from 'lucide-react';
import { CartItem, Product, ViewState } from './types';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import WorkGallery from './components/WorkGallery';
import CustomerServiceModal from './components/CustomerServiceModal';
import AiDesignGenerator from './components/AiDesignGenerator';
import About from './components/About';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [cart, setCart] = useState<{ [id: string]: CartItem }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark Mode Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const current = prev[product.id] || { ...product, quantity: 0 };
      return {
        ...prev,
        [product.id]: { ...current, quantity: current.quantity + 1 }
      };
    });
    // Optional: Show toast
  };

  // Set exact quantity (used by Cart input and buttons)
  const setItemQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => {
      const current = prev[id];
      if (!current) return prev;
      return { ...prev, [id]: { ...current, quantity } };
    });
  };

  // Remove item completely
  const removeItem = (id: number) => {
    setCart(prev => {
      const { [id]: deleted, ...rest } = prev;
      return rest;
    });
  };

  const scrollToGallery = () => {
    setView('home');
    setMobileMenuOpen(false);
    // Small delay to allow view change before scrolling
    setTimeout(() => {
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const cartItems = Object.values(cart) as CartItem[];
  const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const navLinkClass = "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium cursor-pointer transition duration-200 hover:scale-105";

  return (
    <div className={`min-h-screen flex flex-col font-sans text-right transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`} dir="rtl">
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 transition-all duration-300 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => setView('home')}>
               <img 
                 src="https://i.ibb.co/GQ4fbrdP/Black-and-Yellow-Modern-Bold-Illustrative-Welding-Logo-20251029-195628.png" 
                 alt="Logo" 
                 className="w-10 h-10 md:w-12 md:h-12 rounded-full ml-3 border border-gray-200 dark:border-gray-600 transition-transform group-hover:rotate-12 object-cover" 
               />
               <div className="flex flex-col">
                  <span className="text-lg md:text-2xl font-extrabold text-primary tracking-wide leading-none">نافع</span>
                  <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-bold tracking-wider">للحدادة الفنية</span>
               </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6 space-x-reverse items-center text-sm lg:text-base">
              <span onClick={() => setView('home')} className={navLinkClass}>الرئيسية</span>
              <span onClick={() => setView('products')} className={navLinkClass}>المنتجات</span>
              <span onClick={() => setView('ai-design')} className={`${navLinkClass} text-purple-600 dark:text-purple-400 flex items-center gap-1`}>
                <Sparkles size={16} />
                المصمم الذكي
              </span>
              <span onClick={scrollToGallery} className={navLinkClass}>أعمالنا</span>
              <span onClick={() => setView('custom-design')} className={navLinkClass}>طلب خاص</span>
              <span onClick={() => setView('about')} className={navLinkClass}>من نحن</span>
              <span onClick={() => setIsContactModalOpen(true)} className={`${navLinkClass} text-primary flex items-center gap-1`}>
                <HeadphonesIcon size={16} />
                خدمة العملاء
              </span>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse">
               {/* Dark Mode Toggle */}
               <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="تبديل الوضع الليلي"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button onClick={() => setView('cart')} className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition transform hover:scale-110">
                <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
                {cartTotalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/4 bg-red-500 rounded-full shadow-sm">
                    {cartTotalItems}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100 shadow-lg' : 'max-h-0 opacity-0'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
              <button onClick={() => { setView('home'); setMobileMenuOpen(false); }} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-right hover:text-primary">الرئيسية</button>
              <button onClick={() => { setView('products'); setMobileMenuOpen(false); }} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-right hover:text-primary">المنتجات</button>
              <button onClick={() => { setView('ai-design'); setMobileMenuOpen(false); }} className="block px-3 py-3 rounded-md text-base font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 text-right flex items-center gap-2">
                 <Sparkles size={18} /> المصمم الذكي
              </button>
              <button onClick={scrollToGallery} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-right hover:text-primary">أعمالنا</button>
              <button onClick={() => { setView('custom-design'); setMobileMenuOpen(false); }} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-right hover:text-primary">تصميم حسب الطلب</button>
              <button onClick={() => { setView('about'); setMobileMenuOpen(false); }} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-right hover:text-primary">من نحن</button>
              <button onClick={() => { setIsContactModalOpen(true); setMobileMenuOpen(false); }} className="block px-3 py-3 rounded-md text-base font-medium text-primary bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-right flex items-center gap-2">
                <HeadphonesIcon size={18} />
                خدمة العملاء
              </button>
            </div>
        </div>
      </header>

      {/* Main Content Switcher */}
      <main className="flex-grow fade-in pb-10">
        {view === 'home' && (
          <>
            <Hero onChangeView={setView} />
            <ProductList 
              onProductClick={(p) => { setSelectedProduct(p); setView('product-detail'); }} 
              onAddToCart={handleAddToCart} 
            />
            {/* Work Gallery Section */}
            <WorkGallery />
          </>
        )}

        {view === 'products' && (
          <ProductList 
            onProductClick={(p) => { setSelectedProduct(p); setView('product-detail'); }} 
            onAddToCart={handleAddToCart} 
          />
        )}

        {view === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setView('products')} 
            onAddToCart={handleAddToCart} 
          />
        )}

        {view === 'cart' && (
          <Cart 
            cart={cart} 
            onUpdateQuantity={setItemQuantity}
            onRemoveItem={removeItem}
            onChangeView={setView} 
          />
        )}

        {view === 'checkout' && (
          <Checkout 
            onChangeView={setView} 
            cartTotal={cartTotalPrice} 
            cart={cart}
          />
        )}

        {view === 'ai-design' && (
            <AiDesignGenerator onUseDesign={() => setView('custom-design')} />
        )}
        
        {view === 'custom-design' && (
           <div className="max-w-3xl mx-auto px-4 py-12">
               <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">اطلب تصميمك الخاص</h2>
               
               {/* Fixed Form using Formspree provided by user */}
               <form action="https://formspree.io/f/mvgvgzbj" method="POST" encType="multipart/form-data" className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 border border-gray-100 dark:border-gray-700">
                   <input type="hidden" name="_subject" value="طلب تصميم خاص جديد 🎨" />
                   <input type="hidden" name="_next" value="https://ibrahimtoumi8.github.io" /> {/* Optional: redirect logic can be handled by formspree */}
                   
                   <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
                      <input type="text" name="name" placeholder="مثال: أحمد محمد" className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary" required />
                   </div>
                   
                   <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                      <input type="tel" name="phone" placeholder="0770..." className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary" required />
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تفاصيل الطلب</label>
                      <textarea name="details" placeholder="أريد باب حديد قياس 2 متر، مع زخرفة بسيطة..." className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl h-32 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary resize-none" required></textarea>
                   </div>
                   
                   <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                       <label className="block mb-2 text-sm font-bold text-gray-800 dark:text-gray-200">إرفاق صورة (اختياري)</label>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">يمكنك إرسال صورة لتصميم أعجبك، أو صورة للمكان الذي تريد التركيب فيه.</p>
                       <input type="file" name="attachment" accept="image/*" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100" />
                   </div>
                   
                   <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition duration-300 shadow-lg transform hover:scale-[1.02]">إرسال الطلب الآن</button>
               </form>
           </div>
        )}

        {(view === 'success') && (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4 min-h-[60vh]">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <span className="text-5xl">✅</span>
                </div>
                <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">تم استلام طلبك بنجاح!</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md">شكراً لثقتك بنا. سيقوم فريقنا بمراجعة طلبك والاتصال بك هاتفياً في أقرب وقت لتأكيد التفاصيل.</p>
                <button onClick={() => setView('home')} className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-dark transition shadow-lg">العودة للرئيسية</button>
            </div>
        )}

        {view === 'about' && (
             <About onChangeView={setView} />
        )}
        
        {(view === 'payment-ccp' || view === 'payment-edahabia') && (
             <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                 <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border-2 border-primary transform transition hover:scale-[1.01]">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <Briefcase size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-6">
                        {view === 'payment-ccp' ? 'معلومات الدفع CCP' : 'معلومات البطاقة الذهبية'}
                    </h2>
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-right space-y-4 font-mono text-lg mb-8 border border-gray-200 dark:border-gray-600">
                        <p className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-600">
                            <span className="font-bold text-gray-700 dark:text-gray-200">الرقم (RIP/CCP):</span> 
                            <span className="text-gray-900 dark:text-white font-bold">0078945612398754</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-bold text-gray-700 dark:text-gray-200">الاسم:</span> 
                            <span className="text-gray-900 dark:text-white font-bold">نافع تومي</span>
                        </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">يرجى أخذ صورة للوصل وإرسالها لنا، أو انتظر اتصالنا لتأكيد الدفع.</p>
                    <button onClick={() => setView('success')} className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent-dark transition shadow-lg">تم الدفع (تأكيد العملية)</button>
                 </div>
             </div>
        )}

        {/* Customer Service Modal */}
        <CustomerServiceModal 
            isOpen={isContactModalOpen} 
            onClose={() => setIsContactModalOpen(false)} 
        />

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center md:justify-start">
                    <Briefcase className="ml-2 h-5 w-5 text-primary" />
                    نافع للحدادة الفنية
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                    الجودة، الأمان، والتصميم العصري.
                    نحول الحديد إلى تحف فنية تدوم مدى الحياة.
                </p>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-4">تواصل معنا</h3>
                <ul className="space-y-3">
                    <li className="flex items-center justify-center md:justify-start hover:text-white transition group cursor-pointer">
                        <span className="bg-gray-800 p-2 rounded-full ml-2 group-hover:bg-primary transition"><Phone className="w-4 h-4" /></span> 
                        0776 08 40 97
                    </li>
                    <li className="flex items-center justify-center md:justify-start hover:text-white transition group cursor-pointer">
                        <span className="bg-gray-800 p-2 rounded-full ml-2 group-hover:bg-primary transition"><Mail className="w-4 h-4" /></span>
                        <a href="mailto:nafaetoumi20@gmail.com">nafaetoumi20@gmail.com</a>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-4">تابعنا</h3>
                <div className="flex justify-center md:justify-start space-x-4 space-x-reverse">
                    <a href="https://www.facebook.com/profile.php?id=100068400524383" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 hover:text-white transition transform hover:scale-110" title="Facebook">
                        <Facebook size={20} />
                    </a>
                    <a href="https://www.tiktok.com/@akoncarson64?_r=1&_t=ZS-91bwn9xRpsz" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 hover:text-white transition transform hover:scale-110" title="TikTok">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                    </a>
                    <a href="mailto:nafaetoumi20@gmail.com" className="bg-gray-800 p-3 rounded-full hover:bg-red-600 hover:text-white transition transform hover:scale-110" title="Email">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
            &copy; 2025 نافع للحدادة الفنية. جميع الحقوق محفوظة.
        </div>
      </footer>

    </div>
  );
}

export default App;
