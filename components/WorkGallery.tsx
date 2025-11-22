import React, { useState, useEffect } from 'react';
import { workGallery } from '../data';
import { Play, X, Image as ImageIcon, ZoomIn, Loader2 } from 'lucide-react';
import { WorkItem } from '../types';

// Helper component for lazy loading images with skeleton/spinner
const GalleryImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden bg-gray-900 ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 animate-pulse z-0">
                    <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'
                }`}
            />
        </div>
    );
};

const WorkGallery: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Handle modal animation state
    useEffect(() => {
        if (selectedItem) {
            // Small delay to ensure DOM render before starting animation
            const timer = setTimeout(() => setIsModalVisible(true), 10);
            document.body.style.overflow = 'hidden';
            return () => clearTimeout(timer);
        } else {
            setIsModalVisible(false);
            document.body.style.overflow = 'unset';
        }
    }, [selectedItem]);

    const handleCloseModal = () => {
        setIsModalVisible(false);
        // Wait for animation to finish before unmounting
        setTimeout(() => setSelectedItem(null), 300);
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="gallery">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">معرض أعمالنا</h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">تصفح أحدث المشاريع التي قمنا بتنفيذها (صور وفيديو)</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workGallery.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="group relative rounded-xl shadow-lg overflow-hidden cursor-pointer aspect-video bg-gray-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {item.type === 'video' ? (
                                <div className="w-full h-full relative">
                                    <video 
                                        src={item.url}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                                        muted
                                        playsInline
                                        loop
                                        onMouseOver={e => e.currentTarget.play().catch(() => {})}
                                        onMouseOut={e => {
                                            e.currentTarget.pause();
                                            e.currentTarget.currentTime = 0;
                                        }}
                                    />
                                    {/* Play Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <Play size={32} fill="currentColor" className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <GalleryImage 
                                        src={item.url} 
                                        alt={item.title}
                                        className="w-full h-full group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    
                                    {/* Zoom Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 pointer-events-none">
                                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-gray-900 backdrop-blur-sm shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                            <ZoomIn size={24} />
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {/* Title Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white font-bold text-lg drop-shadow-md">{item.title}</h3>
                                <span className="text-xs text-gray-300 flex items-center gap-1 mt-1">
                                    {item.type === 'video' ? <Play size={12} /> : <ImageIcon size={12} />}
                                    {item.type === 'video' ? 'فيديو' : 'صورة'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedItem && (
                <div 
                    className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
                        isModalVisible ? 'bg-black/95 backdrop-blur-md opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
                    }`}
                    onClick={handleCloseModal}
                >
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-50"
                        onClick={handleCloseModal}
                    >
                        <X size={32} />
                    </button>

                    <div 
                        className={`relative max-w-6xl w-full transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                            isModalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12'
                        }`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center max-h-[85vh]">
                            {selectedItem.type === 'video' ? (
                                <div className="w-full h-full">
                                    <video
                                        src={selectedItem.url}
                                        controls
                                        autoPlay
                                        className="w-full h-full max-h-[85vh]"
                                    />
                                </div>
                            ) : (
                                <img 
                                    src={selectedItem.url} 
                                    alt={selectedItem.title} 
                                    className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
                                />
                            )}
                        </div>
                        <h3 className="text-white text-xl md:text-2xl font-bold text-center mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            {selectedItem.title}
                        </h3>
                    </div>
                </div>
            )}
        </section>
    );
};

export default WorkGallery;