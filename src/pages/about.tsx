import { motion } from "framer-motion";
import { Users, Award, MapPin, Heart, Instagram, Bike, BadgeDollarSign, Truck } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col w-full pb-24">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 z-10" />
          <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop" alt="دراجة في الطبيعة" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="container relative z-20 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary font-bold text-xs tracking-[0.25em] uppercase mb-4">حكايتنا</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6">قصتنا</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">أسسنا Two Wheels ليكون بيتكم ووجهتكم الأولى — لكل مغامر، رياضي، وعاشق للدراجات في سوريا.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border/60 -mt-10 relative z-30 mx-4 md:mx-auto md:w-4/5 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-x-reverse divide-border/60">
          {[{ value: "+12", label: "منتج متوفر" }, { value: "+500", label: "عميل سعيد" }, { value: "4.9", label: "متوسط التقييم" }, { value: "586", label: "إعجاب على إنستا" }].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black text-primary mb-2">{s.value}</span>
              <span className="text-muted-foreground font-medium text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-black mb-6">Two Wheels — وجهتك الأولى</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">جاهزين نكسر الروتين ونعيش الشغف سوا! انطلقنا من دمشق لنكون الوجهة الأولى لكل محبي الدراجات الهوائية في سوريا، سواء كنت مغامراً، رياضياً، أو مبتدئاً.</p>
            <p className="text-muted-foreground leading-relaxed mb-8">نقدم تشكيلة متنوعة من الدراجات الجبلية، BMX، دراجات الأطفال، والإكسسوارات بأسعار تناسب الجميع. تواصلوا معنا على الرسائل!</p>
            <div className="space-y-4 mb-8">
              {[
                { icon: Award, title: "جودة مضمونة", desc: "علامات تجارية موثوقة بأسعار مناسبة" },
                { icon: MapPin, title: "دمشق، سوريا", desc: "نوصّل لكل المحافظات السورية" },
                { icon: Users, title: "خدمة شخصية", desc: "تواصل معنا عالرسائل لأي استفسار" },
                { icon: Heart, title: "شغف حقيقي", desc: "إحنا عشاق دراجات بنفسنا" },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0"><Icon size={20} /></div>
                  <div><div className="font-black">{title}</div><div className="text-sm text-muted-foreground">{desc}</div></div>
                </div>
              ))}
            </div>
            <a href="https://www.instagram.com/twowheels.sy" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-md font-black hover:bg-primary/90 transition-all hover:scale-[1.02]">
              <Instagram size={18} />تابعنا على الإنستاغرام @twowheels.sy
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden aspect-square md:aspect-auto md:h-[500px] border border-border/60">
            <img src="https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=2070&auto=format&fit=crop" alt="Two Wheels" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-card" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="container px-4 md:px-6 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-5 h-px bg-primary inline-block" />مميزاتنا<span className="w-5 h-px bg-primary inline-block" />
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black">
              لماذا <span className="gradient-text">Two Wheels</span>؟
            </motion.h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Bike,
                number: "01",
                title: "تشكيلة متنوعة",
                desc: "دراجات جبلية، BMX، أطفال، وإكسسوارات ذكية. عندنا كل شي لكل نوع من الركاب.",
              },
              {
                icon: BadgeDollarSign,
                number: "02",
                title: "أسعار تنافسية",
                desc: "بدنا كل إنسان يقدر يمتلك دراجة كويسة بسعر مناسب — الجودة مو رفاهية.",
              },
              {
                icon: Truck,
                number: "03",
                title: "توصيل لكل سوريا",
                desc: "مو بس دمشق! بنوصلك لكل المحافظات بتغليف آمن. تواصل معنا للتفاصيل.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card-hover group relative bg-background border border-border/50 rounded-2xl p-8 overflow-hidden"
              >
                {/* Number watermark */}
                <div className="absolute top-4 left-5 text-7xl font-black text-white/3 group-hover:text-primary/6 transition-colors duration-500 select-none leading-none">
                  {item.number}
                </div>
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon container */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(171_36%_52%/0.3)] transition-all duration-300">
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Bottom teal line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
