import { Link } from "wouter";
import { Instagram, Facebook, MapPin, MessageCircle, ArrowLeft, ChevronLeft } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/cart", label: "سلة التسوق" },
  { href: "/wishlist", label: "قائمة الأمنيات" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Main footer body */}
      <div className="bg-card relative">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Brand column */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-flex group mb-6 block">
                <img
                  src="/logo.png"
                  alt="Two Wheels"
                  className="h-10 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
                وجهتك الأولى للدراجات الهوائية في سوريا — نكسر الروتين ونعيش الشغف سوا.
              </p>

              {/* Social */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/twowheels.sy"
                  target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 bg-secondary hover:bg-primary border border-border hover:border-primary px-4 py-2 rounded-xl text-muted-foreground hover:text-primary-foreground transition-all duration-200 text-sm font-medium"
                >
                  <Instagram size={15} />
                  <span>Instagram</span>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl border border-border bg-secondary hover:bg-primary hover:border-primary text-muted-foreground hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                >
                  <Facebook size={15} />
                </a>
              </div>
            </div>

            {/* Links column */}
            <div className="md:col-span-3">
              <h3 className="text-xs font-black tracking-[0.2em] uppercase text-muted-foreground mb-6">
                روابط سريعة
              </h3>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <ChevronLeft
                        size={12}
                        className="text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="md:col-span-4">
              <h3 className="text-xs font-black tracking-[0.2em] uppercase text-muted-foreground mb-6">
                تواصل معنا
              </h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <MapPin size={13} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">الموقع</p>
                    <p className="text-xs text-muted-foreground mt-0.5">دمشق، سوريا 🇸🇾</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Instagram size={13} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">إنستاغرام</p>
                    <a
                      href="https://www.instagram.com/twowheels.sy"
                      target="_blank" rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary/80 transition-colors mt-0.5 block"
                    >
                      @twowheels.sy
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <MessageCircle size={13} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">للطلب والاستفسار</p>
                    <p className="text-xs text-muted-foreground mt-0.5">راسلونا على الإنستاغرام</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-card border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/50">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} Two Wheels Syria
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground/50">متاحون للطلبات</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
