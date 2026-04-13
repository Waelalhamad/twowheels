import { Link } from "wouter";
import { ShoppingCart, Heart, Star, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { toast } = useToast();
  const wishlisted = isWishlisted(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({ title: "تمت الإضافة للسلة", description: product.nameAr });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    toast({ title: wishlisted ? "تمت الإزالة من الأمنيات" : "تمت الإضافة للأمنيات" });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      className="card-hover group relative bg-card border border-border/50 rounded-2xl overflow-hidden"
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary img-zoom">
          <img
            src={product.imageUrl}
            alt={product.nameAr}
            className="w-full h-full object-cover"
          />

          {/* Dark gradient bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {product.featured && (
              <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg shadow-lg">
                مميز
              </span>
            )}
            {hasDiscount && (
              <span className="bg-rose-500/90 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "absolute top-3 left-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm",
              wishlisted
                ? "bg-rose-500 text-white opacity-100"
                : "bg-black/40 text-white/70 opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white"
            )}>
            <Heart size={13} className={wishlisted ? "fill-white" : ""} />
          </button>

          {/* View arrow — appears on hover */}
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Category + Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase bg-secondary/80 px-2 py-0.5 rounded-md">
              {product.categoryNameAr}
            </span>
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-primary text-primary" />
                <span className="text-[11px] font-bold text-muted-foreground">{product.rating}</span>
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="font-bold text-sm leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.nameAr}
          </h3>

          {/* Price + Cart */}
          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div>
              <div className="text-base font-black text-primary">{formatPrice(product.price)}</div>
              {hasDiscount && (
                <div className="text-[11px] text-muted-foreground line-through">{formatPrice(product.originalPrice!)}</div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-press w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center border border-primary/20 hover:border-primary hover:shadow-[0_0_16px_hsl(171_36%_52%/0.3)]">
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
