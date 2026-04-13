import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({ title: "تمت الإضافة للسلة", description: `تم إضافة ${product.nameAr}` });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 pt-28 pb-24 min-h-[70vh]">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Heart size={22} className="fill-primary" /></div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black">قائمة الأمنيات</h1>
          <p className="text-muted-foreground mt-1 text-sm">{items.length} منتج محفوظ</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-6"><Heart size={40} /></div>
          <h2 className="text-2xl font-black mb-3">قائمتك فارغة</h2>
          <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">أضف المنتجات التي تعجبك لتجدها هنا لاحقاً بسهولة.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md font-black hover:bg-primary/90 transition-all"><ArrowLeft size={18} />تصفح المنتجات</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {items.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: index * 0.05 }} layout
                className="group rounded-lg overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <img src={product.imageUrl} alt={product.nameAr} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {product.featured && <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-sm">مميز</span>}
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-muted-foreground mb-1 font-bold uppercase tracking-wide">{product.categoryNameAr}</div>
                    <h3 className="font-black mb-3 line-clamp-1 group-hover:text-primary transition-colors">{product.nameAr}</h3>
                    <span className="text-xl font-black text-primary">{formatPrice(product.price)}</span>
                  </div>
                </Link>
                <div className="px-5 pb-5 flex gap-2">
                  <button onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-md font-black text-sm hover:bg-primary/90 transition-all">
                    <ShoppingCart size={15} />أضف للسلة
                  </button>
                  <button onClick={() => removeItem(product.id)}
                    className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
