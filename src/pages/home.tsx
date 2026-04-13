import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ShieldCheck, Truck, Clock, ChevronDown, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

const marqueeItems = ["دراجات جبلية", "MTB", "دراجات سباق", "ROAD BIKES", "إكسسوارات", "GEAR", "شحن لسوريا", "SYRIA DELIVERY", "دراجات جبلية", "MTB"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] } }),
};

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop"
            alt="hero"
            className="w-full h-full object-cover scale-105"
            style={{ filter: "brightness(0.45) saturate(0.9)" }}
          />
          {/* Multi-layer gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
          {/* Teal glow orb */}
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent z-20" />

        {/* Content */}
        <div className="container relative z-10 px-4 md:px-6 pt-24 pb-16">
          <motion.div initial="hidden" animate="show" className="max-w-3xl">
            {/* Pill badge */}
            <motion.div
              variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-md border border-primary/20 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold tracking-wider">🇸🇾 متاحون الآن</span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div variants={fadeUp} custom={1} className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">Two Wheels Syria</span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                variants={fadeUp} custom={2}
                className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.88] tracking-tight"
              >
                مغامرتك
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                variants={fadeUp} custom={3}
                className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.88] tracking-tight gradient-text text-glow"
              >
                تبدأ من هنا
              </motion.h1>
            </div>

            {/* Body */}
            <motion.p variants={fadeUp} custom={4} className="text-muted-foreground text-base md:text-lg max-w-md mb-10 leading-relaxed">
              لكل مغامر ورياضي وعاشق دراجة في سوريا. نكسر الروتين ونعيش الشغف سوا.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={5} className="flex flex-wrap items-center gap-4">
              <Link href="/products"
                className="btn-press group inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_30px_hsl(171_36%_52%/0.35)] hover:bg-primary/90 hover:shadow-[0_0_40px_hsl(171_36%_52%/0.5)] transition-all duration-300">
                <Sparkles size={15} />
                تسوق الآن
                <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                <span className="border-b border-muted-foreground/40 group-hover:border-foreground pb-px transition-colors">من نحن</span>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} custom={6} className="flex items-center gap-8 mt-12 pt-8 border-t border-white/8">
              {[
                { value: "+500", label: "عميل سعيد" },
                { value: "+12", label: "منتج متاح" },
                { value: "4.9★", label: "متوسط التقييم" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-black text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground/50 tracking-[0.3em] uppercase">scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <ChevronDown size={16} className="text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="relative bg-primary/5 border-y border-primary/10 py-3.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap shrink-0">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-primary/70 font-bold text-xs tracking-[0.2em] uppercase px-6">
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
                <span className="w-5 h-px bg-primary inline-block" />تصفح حسب النوع
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-black">
                التصنيفات
              </motion.h2>
            </div>
            <Link href="/products"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
              <span>عرض الكل</span>
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link href={`/products?category=${cat.name}`}
                  className="group relative h-72 rounded-2xl overflow-hidden block img-zoom">
                  <img src={cat.imageUrl} alt={cat.nameAr} className="w-full h-full object-cover brightness-75 group-hover:brightness-85 transition-all duration-500" />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  {/* Teal bottom line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  {/* Text */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-primary text-xs font-bold tracking-widest uppercase mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">{cat.productCount} منتج</span>
                    <h3 className="text-2xl font-black text-white transition-transform duration-300 group-hover:-translate-y-1">{cat.nameAr}</h3>
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                      <span className="text-white/70 text-xs">تصفح الآن</span>
                      <ArrowLeft size={12} className="text-primary" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-card" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="container px-4 md:px-6 relative">
          <div className="flex items-end justify-between mb-14">
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
                <span className="w-5 h-px bg-primary inline-block" />منتخبة بعناية
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-black">
                التشكيلة المميزة
              </motion.h2>
            </div>
            <Link href="/products"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
              <span>عرض الكل</span>
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: "ضمان الجودة", desc: "جميع دراجاتنا بضمان شامل ضد عيوب الصناعة مع خدمة ما بعد البيع.", number: "01" },
              { icon: Truck, title: "شحن سريع وآمن", desc: "توصيل لجميع المحافظات السورية مع تغليف آمن لحماية الدراجة.", number: "02" },
              { icon: Clock, title: "دعم فني متخصص", desc: "فريق الصيانة لدينا جاهز لمساعدتك وإجابة استفساراتك في أي وقت.", number: "03" },
            ].map(({ icon: Icon, title, desc, number }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover group relative bg-card border border-border/50 rounded-2xl p-8 overflow-hidden">
                {/* Number watermark */}
                <div className="absolute top-3 left-5 text-6xl font-black text-white/3 group-hover:text-primary/6 transition-colors duration-500 select-none leading-none">{number}</div>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(171_36%_52%/0.3)]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-black text-lg mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM CTA ── */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
        <div className="absolute inset-0 border-y border-primary/10" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-primary/10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-primary/10 -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />

        <div className="container px-4 md:px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold tracking-wider">انضم لعائلتنا</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
              شاركنا شغفك<br />
              <span className="gradient-text">على الإنستاغرام</span>
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto mb-10 text-sm leading-relaxed">
              ابعث رسالة لطلب الدراجة أو أي استفسار. فريقنا جاهز دايماً.
            </p>
            <a
              href="https://www.instagram.com/twowheels.sy"
              target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_30px_hsl(171_36%_52%/0.3)] hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(171_36%_52%/0.45)] transition-all duration-300">
              @twowheels.sy
              <ArrowLeft size={15} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
