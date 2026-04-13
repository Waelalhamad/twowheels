import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShoppingCart, Star, ShieldCheck, ArrowRight, Check, Package, Heart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { formatPrice, cn } from "@/lib/utils";
import { products, reviews } from "@/lib/data";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);
  const productReviews = reviews.filter((r) => r.productId === productId);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-black mb-4">المنتج غير موجود</h1>
      <Link href="/products" className="text-primary hover:underline">العودة للمنتجات</Link>
    </div>
  );

  const allImages = [product.imageUrl, ...(product.images || [])];
  const wishlisted = isWishlisted(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;

  const handleAddToCart = () => {
    addItem(product);
    toast({ title: "تمت الإضافة للسلة", description: `تم إضافة ${product.nameAr}` });
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
    toast({ title: wishlisted ? "تمت الإزالة" : "تمت الإضافة للأمنيات" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/60 bg-card">
        <div className="container mx-auto px-4 md:px-6 pt-24 pb-4">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowRight size={15} /><span>المنتجات</span><span className="text-border">/</span>
            <span className="text-foreground font-medium truncate max-w-xs">{product.nameAr}</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Images */}
          <div className="w-full lg:w-1/2">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="relative rounded-lg overflow-hidden bg-card border border-border/60 aspect-[4/3] mb-4">
              <img src={allImages[selectedImage]} alt={product.nameAr} className="w-full h-full object-cover" />
              {hasDiscount && <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs font-black px-3 py-1.5 rounded-sm">-{discountPercent}% خصم</div>}
            </motion.div>
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((img, index) => (
                  <button key={index} onClick={() => setSelectedImage(index)}
                    className={cn("relative rounded-md overflow-hidden w-20 h-20 flex-shrink-0 border-2 transition-all duration-200",
                      selectedImage === index ? "border-primary" : "border-border/40 opacity-60 hover:opacity-100 hover:border-border")}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary font-black text-xs tracking-[0.2em] uppercase">{product.brand}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-muted-foreground text-xs">{product.categoryNameAr}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{product.nameAr}</h1>
              {product.rating > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"} />)}
                  </div>
                  <span className="text-sm font-bold">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviewCount} تقييم)</span>
                </div>
              )}
              <div className="flex items-end gap-4 mb-6 pb-6 border-b border-border/60">
                <span className="text-4xl font-black text-primary">{formatPrice(product.price)}</span>
                {hasDiscount && <span className="text-lg text-muted-foreground line-through mb-1">{formatPrice(product.originalPrice!)}</span>}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm">{product.descriptionAr}</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[{ icon: ShieldCheck, text: "ضمان سنة كاملة" }, { icon: Package, text: "توصيل لجميع المحافظات" }, { icon: Check, text: `${product.stock} قطعة متوفرة` }].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-card border border-border/60 rounded-md px-3 py-2.5">
                    <Icon size={15} className="text-primary flex-shrink-0" />
                    <span className="text-xs font-medium">{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-4 font-black text-base tracking-wide hover:bg-primary/90 transition-all rounded-md hover:scale-[1.02]">
                  <ShoppingCart size={20} />أضف إلى السلة
                </button>
                <button onClick={handleToggleWishlist}
                  className={cn("w-14 flex items-center justify-center rounded-md border transition-all duration-200",
                    wishlisted ? "bg-rose-500 border-rose-500 text-white" : "border-border/60 text-muted-foreground hover:border-rose-400 hover:text-rose-400")}>
                  <Heart size={18} className={wishlisted ? "fill-white" : ""} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-20 pt-12 border-t border-border/60">
          <div className="mb-10">
            <p className="text-primary font-bold text-xs tracking-[0.25em] uppercase mb-3">آراء المشترين</p>
            <h2 className="text-3xl font-black">تقييمات العملاء</h2>
          </div>
          {productReviews.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg border border-border/60">
              <p className="text-muted-foreground">لا توجد تقييمات لهذا المنتج حتى الآن.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productReviews.map((review, i) => (
                <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border/60 p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-black">{review.customerName}</div>
                      <div className="text-xs text-muted-foreground/60 mt-0.5">{new Date(review.createdAt).toLocaleDateString("ar-SY")}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} size={14} className={j < review.rating ? "fill-amber-400 text-amber-400" : "text-border"} />)}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
