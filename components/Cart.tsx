import React, { useState } from 'react';
import { CartItem, ViewState } from '../types';
import { Trash2, CreditCard, AlertTriangle } from 'lucide-react';

interface CartProps {
    cart: { [id: string]: CartItem };
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
    onChangeView: (view: ViewState) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onUpdateQuantity, onRemoveItem, onChangeView }) => {
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    
    const cartItems = Object.values(cart) as CartItem[];
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleDeleteConfirm = () => {
        if (itemToDelete) {
            onRemoveItem(itemToDelete);
            setItemToDelete(null);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">سلة التسوق فارغة</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">لم تقم بإضافة أي منتجات بعد.</p>
                <button 
                    onClick={() => onChangeView('products')}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
                >
                    تصفح المنتجات
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">سلة التسوق</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 transition-colors duration-300">
                {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center border-b border-gray-100 dark:border-gray-700 p-6 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                        <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                        
                        <div className="flex-grow text-center sm:text-right mt-4 sm:mt-0 sm:mr-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{item.price.toLocaleString()} د.ج</p>
                        </div>

                        <div className="flex items-center mt-4 sm:mt-0">
                            <div className="flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg mx-4 shadow-sm">
                                <button 
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-r-lg disabled:opacity-30"
                                >-</button>
                                <input 
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (!isNaN(val) && val > 0) {
                                            onUpdateQuantity(item.id, val);
                                        }
                                    }}
                                    className="w-16 text-center py-2 text-gray-800 dark:text-white bg-transparent font-bold outline-none border-x border-gray-100 dark:border-gray-600"
                                />
                                <button 
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-l-lg"
                                >+</button>
                            </div>
                            <button 
                                onClick={() => setItemToDelete(item.id)}
                                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-full transition group"
                                title="حذف المنتج"
                            >
                                <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
                <div className="flex justify-between items-center mb-4 text-lg">
                    <span className="text-gray-600 dark:text-gray-300">المجموع الفرعي:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{total.toLocaleString()} د.ج</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                    <span>الإجمالي:</span>
                    <span>{total.toLocaleString()} د.ج</span>
                </div>
                <button 
                    onClick={() => onChangeView('checkout')}
                    className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-4 rounded-xl transition shadow-lg flex items-center justify-center transform hover:-translate-y-1"
                >
                    <CreditCard className="ml-2" />
                    متابعة عملية الدفع
                </button>
                <button 
                    onClick={() => onChangeView('products')}
                    className="w-full mt-4 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary py-2 font-medium transition"
                >
                    مواصلة التسوق
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 transform scale-100 animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mx-auto mb-4 text-red-500">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">حذف المنتج؟</h3>
                        <p className="text-gray-500 dark:text-gray-300 text-center mb-6">
                            هل أنت متأكد من رغبتك في إزالة هذا المنتج من سلة التسوق؟
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={handleDeleteConfirm}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition shadow-md"
                            >
                                نعم، حذف
                            </button>
                            <button 
                                onClick={() => setItemToDelete(null)}
                                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-lg transition"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

function ShoppingCart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}