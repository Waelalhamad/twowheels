import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Heart, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "المنتجات", href: "/products" },
    { name: "من نحن", href: "/about" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled
        ? "glass border-b border-white/5 py-2.5 shadow-[0_8px_32px_hsl(224_20%_2%/0.5)]"
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <img
              src="/logo.png"
              alt="Two Wheels"
              className="h-9 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(link.href)
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}>
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <Link href="/products"
              className="hidden sm:flex p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200">
              <Search className="w-4 h-4" />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-200">
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart"
              className="btn-press relative flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-bold text-sm shadow-[0_0_20px_hsl(171_36%_52%/0.25)]">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-bold">السلة</span>
              {totalItems > 0 && (
                <span className="bg-white/20 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "absolute top-full left-0 right-0 glass border-b border-white/5 transition-all duration-300 overflow-hidden md:hidden",
        mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}>
              {link.name}
            </Link>
          ))}
          <Link href="/wishlist"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-rose-400 hover:bg-rose-500/8 transition-colors">
            <Heart size={16} />
            قائمة الأمنيات
            {wishlistCount > 0 && (
              <span className="bg-rose-500 text-white text-xs font-black px-1.5 py-0.5 rounded-full mr-auto">{wishlistCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
