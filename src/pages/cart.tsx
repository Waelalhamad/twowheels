import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Tag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center container mx-auto px-4 text-center pt-24">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <div className="w-24 h-24 bg-secondary rounded-3xl flex items-center justify-center text-muted-foreground mb-8 mx-auto">
            <ShoppingBag size={40} className="text-primary/50" />
          </div>
          <h1 className="text-3xl font-black mb-3">سلة التسوق فارغة</h1>
          <p className="text-muted-foreground mb-8 text-sm">لم تقم بإضافة أي منتجات بعد.</p>
          <Link href="/products"
            className="btn-press inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_hsl(171_36%_52%/0.3)]">
            تصفح المنتجات
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 pb-8 bg-card border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
            <span className="w-5 h-px bg-primary inline-block" />{totalItems} عنصر
          </p>
          <h1 className="text-4xl font-black">سلة التسوق</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Items */}
          <div className="flex-1 min-w-0">
            <div className="space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id} layout
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group flex items-center gap-4 bg-card border border-border/50 rounded-2xl p-4 hover:border-border transition-colors"
                  >
                    {/* Image */}
                    <Link href={`/products/${item.product.id}`}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0 img-zoom">
                      <img src={item.product.imageUrl} alt={item.product.nameAr} className="w-full h-full object-cover" />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="font-bold text-sm hover:text-primary transition-colors line-clamp-1">{item.product.nameAr}</h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.product.categoryNameAr}</p>
                      <p className="text-primary font-black text-sm mt-1">{formatPrice(item.product.price)}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 bg-secondary rounded-xl px-2 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                        <Minus size={12} />
                      </button>
                      <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right flex-shrink-0 hidden sm:block">
                      <p className="font-black text-sm text-primary">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 rounded-xl text-muted-foreground/40 hover:text-destructive hover:bg-destructive/8 transition-all duration-200 opacity-0 group-hover:opacity-100">
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-6">
              <h2 className="font-black text-lg mb-5 flex items-center gap-2">
                <Tag size={16} className="text-primary" />
                ملخص الطلب
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">التوصيل</span>
                  <span className="font-bold text-emerald-400 text-xs bg-emerald-400/10 px-2 py-0.5 rounded-lg">مجاني</span>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-black">الإجمالي</span>
                  <span className="text-2xl font-black text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={() => setLocation("/checkout")}
                className="btn-press w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_hsl(171_36%_52%/0.25)] hover:shadow-[0_0_30px_hsl(171_36%_52%/0.4)]">
                متابعة الشراء
                <ArrowLeft size={15} />
              </button>

              <Link href="/products"
                className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-2">
                ← متابعة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
