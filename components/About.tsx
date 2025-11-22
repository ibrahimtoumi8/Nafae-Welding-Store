import React from 'react';
import { ViewState } from '../types';
import { teamMembers } from '../data';
import { Users, Award, PenTool, Truck } from 'lucide-react';

interface AboutProps {
    onChangeView: (view: ViewState) => void;
}

const About: React.FC<AboutProps> = ({ onChangeView }) => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800 py-16 border-b dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">عن ورشة نافع</h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        منذ التأسيس، ونحن نلتزم بتقديم حلول متكاملة تدمج بين المتانة الهندسية والجمالية الفنية. 
                        نحن لا نصنع الحديد فحسب، بل نصنع الأمان والجمال لمنزلك.
                    </p>
                </div>
            </div>

            {/* Stats / Values Section */}
            <div className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                <Award size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">جودة عالية</h3>
                            <p className="text-gray-600 dark:text-gray-400">نستخدم أجود أنواع الحديد والدهانات المقاومة للصدأ لضمان عمر طويل.</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                                <PenTool size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">تصميم مبتكر</h3>
                            <p className="text-gray-600 dark:text-gray-400">دمج تقنيات القص بالليزر والتصاميم العصرية (Modern & Classic).</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                                <Truck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">تغطية وطنية</h3>
                            <p className="text-gray-600 dark:text-gray-400">خدمات التوصيل والتركيب متاحة لجميع ولايات الجزائر الـ 58.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block p-3 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                            <Users className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">فريق العمل</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            وراء كل عمل فني متقن، فريق من الحرفيين والمهندسين الشغوفين بمهنتهم.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                                    <p className="text-primary font-medium mb-3">{member.role}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">جاهز لتحويل رؤيتك إلى واقع؟</h2>
                    <p className="text-lg text-blue-100 mb-8">تصفح منتجاتنا أو تواصل معنا لتصميم مشروعك الخاص.</p>
                    <button 
                        onClick={() => onChangeView('products')} 
                        className="px-8 py-4 bg-white text-blue-700 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
                    >
                        تصفح المنتجات
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;