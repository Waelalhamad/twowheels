import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, Search, X, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

export default function Products() {
  const searchParams = new URLSearchParams(window.location.search);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = !selectedCategory || p.categoryName === selectedCategory;
      const matchSearch = !searchQuery || p.nameAr.includes(searchQuery) || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="pt-24 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-card border-b border-border/50" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <span className="w-5 h-px bg-primary inline-block" />اكتشف مجموعتنا
            </p>
            <h1 className="text-5xl md:text-6xl font-black mb-3">المنتجات</h1>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              تصفح مجموعتنا الواسعة من الدراجات والإكسسوارات الفاخرة.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <span className="text-sm text-muted-foreground">{filtered.length} منتج</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary text-sm font-medium hover:bg-muted transition-colors">
            <SlidersHorizontal size={14} />
            فلاتر
            {(selectedCategory || searchQuery) && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`w-full md:w-60 flex-shrink-0 ${sidebarOpen ? "block" : "hidden md:block"}`}>
            <div className="sticky top-24 space-y-3">
              {/* Search */}
              <div className="bg-card border border-border/50 rounded-2xl p-4">
                <div className="relative">
                  <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    type="text"
                    placeholder="ابحث عن دراجة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-secondary/60 border border-border/40 rounded-xl pr-9 pl-9 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors">
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card border border-border/50 rounded-2xl p-4">
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
                  <Filter size={11} className="text-primary" />التصنيفات
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-right px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                      selectedCategory === ""
                        ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(171_36%_52%/0.25)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}>
                    <span className="text-xs opacity-60">{products.length}</span>
                    <span>الكل</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-right px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                        selectedCategory === cat.name
                          ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(171_36%_52%/0.25)]"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                      }`}>
                      <span className="text-xs opacity-60">{cat.productCount}</span>
                      <span>{cat.nameAr}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={() => { setSelectedCategory(""); setSearchQuery(""); }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-muted-foreground hover:text-destructive border border-border/40 hover:border-destructive/30 hover:bg-destructive/5 transition-all">
                  <X size={11} />مسح الفلاتر
                </button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="hidden md:flex items-center justify-between mb-6 pb-4 border-b border-border/30">
              <span className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{filtered.length}</span> منتج
              </span>
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={() => { setSelectedCategory(""); setSearchQuery(""); }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-destructive transition-colors">
                  <X size={11} />مسح الفلاتر
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center bg-card border border-border/50 rounded-2xl">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground mb-5">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-black mb-2">لا توجد نتائج</h3>
                <p className="text-muted-foreground text-sm max-w-xs mb-6">لم نجد منتجات تطابق بحثك.</p>
                <button
                  onClick={() => { setSelectedCategory(""); setSearchQuery(""); }}
                  className="btn-press px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors">
                  عرض الكل
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
