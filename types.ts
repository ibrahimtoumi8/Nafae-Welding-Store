export interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    description: string;
    longDescription: string;
    category: 'doors' | 'windows' | 'wedding' | 'home' | 'tools';
    images: string[];
}

export interface CartItem extends Product {
    quantity: number;
}

export type ViewState = 'home' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'custom-design' | 'ai-design' | 'about' | 'success' | 'payment-ccp' | 'payment-edahabia';

export interface WorkItem {
    id: number;
    type: 'video' | 'image';
    url: string;
    thumbnailUrl?: string;
    title: string;
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
}