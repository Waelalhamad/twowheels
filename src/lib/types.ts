export interface Product {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images?: string[];
  brand: string;
  categoryId: number;
  categoryName: string;
  categoryNameAr: string;
  featured: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: number;
  name: string;
  nameAr: string;
  imageUrl: string;
  productCount: number;
}

export interface Review {
  id: number;
  productId: number;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  notes?: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

export interface OrderItem {
  productId: number;
  productNameAr: string;
  quantity: number;
  price: number;
}
