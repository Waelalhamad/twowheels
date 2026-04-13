import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { User, Phone, MapPin, MessageSquare, CheckCircle2, ChevronLeft, ShoppingBag, Loader2, Lock } from "lucide-react";

const schema = z.object({
  customerName: z.string().min(2, "الاسم مطلوب"),
  customerPhone: z.string().min(7, "رقم الهاتف غير صالح"),
  customerCity: z.string().min(2, "المدينة مطلوبة"),
  customerAddress: z.string().min(5, "العنوان مطلوب"),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const STEPS = [
  { id: 1, label: "معلوماتك", icon: User },
  { id: 2, label: "التوصيل", icon: MapPin },
  { id: 3, label: "تأكيد", icon: CheckCircle2 },
];

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-foreground/80">{label}</label>
      {children}
      {error && (
        <p className="text-destructive text-xs flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-destructive inline-block" />{error}
        </p>
      )}
    </div>
  );
}

const Input = React.forwardRef<HTMLInputElement, { icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ icon: Icon, ...props }, ref) => (
    <div className="relative">
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <Icon size={15} />
      </div>
      <input
        ref={ref}
        {...props}
        className="w-full bg-background border border-border/60 rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
      />
    </div>
  )
);
Input.displayName = "Input";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [attempted, setAttempted] = useState(false);

  const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  if (items.length === 0) { setLocation("/cart"); return null; }

  const nextStep = async () => {
    setAttempted(true);
    const fields: (keyof FormValues)[] = step === 1
      ? ["customerName", "customerPhone"]
      : ["customerCity", "customerAddress"];
    const ok = await trigger(fields);
    if (ok) { setStep((s) => s + 1); setAttempted(false); }
  };

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 900));
    const orderId = Date.now();
    const order = {
      id: orderId,
      ...data,
      items: items.map((i) => ({
        productId: i.product.id,
        productNameAr: i.product.nameAr,
        quantity: i.quantity,
        price: i.product.price,
      })),
      total: totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(`order-${orderId}`, JSON.stringify(order));
    clearCart();
    setLocation(`/orders/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="pt-24 pb-8 bg-card border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
            <span className="w-5 h-px bg-primary inline-block" />إتمام الطلب
          </p>
          <h1 className="text-4xl font-black">الدفع والتوصيل</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left: form */}
          <div className="flex-1 min-w-0">

            {/* Step indicator */}
            <div className="flex items-center gap-0 mb-10">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const active = step === s.id;
                const done = step > s.id;
                return (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                        done
                          ? "bg-primary border-primary text-primary-foreground"
                          : active
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-secondary border-border text-muted-foreground"
                      }`}>
                        {done ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                      </div>
                      <span className={`text-xs font-bold transition-colors ${active || done ? "text-primary" : "text-muted-foreground"}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-px mx-3 mb-5 transition-colors duration-500 ${done ? "bg-primary/50" : "bg-border/60"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form card */}
            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
              <form onSubmit={handleSubmit(onSubmit)}>

                  {/* Step 1 — Personal info */}
                  <div className={step === 1 ? "block" : "hidden"}>
                    <motion.div key="step1"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="p-8"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <User size={16} />
                        </div>
                        <div>
                          <h2 className="font-black text-lg">معلوماتك</h2>
                          <p className="text-muted-foreground text-xs">حتى نتواصل معك بشأن طلبك</p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <Field label="الاسم الكامل" error={attempted ? errors.customerName?.message : undefined}>
                          <Input icon={User} {...register("customerName")} placeholder="أحمد محمد" />
                        </Field>
                        <Field label="رقم الهاتف" error={attempted ? errors.customerPhone?.message : undefined}>
                          <Input icon={Phone} {...register("customerPhone")} placeholder="09XX XXX XXX" dir="ltr" />
                        </Field>
                      </div>

                      <button type="button" onClick={nextStep}
                        className="btn-press mt-8 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_hsl(171_36%_52%/0.25)]">
                        التالي — معلومات التوصيل
                        <ChevronLeft size={16} />
                      </button>
                    </motion.div>
                  </div>

                  {/* Step 2 — Delivery info */}
                  <div className={step === 2 ? "block" : "hidden"}>
                    <motion.div key="step2"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="p-8"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <h2 className="font-black text-lg">معلومات التوصيل</h2>
                          <p className="text-muted-foreground text-xs">أين تريد استلام طلبك؟</p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <Field label="المدينة / المحافظة" error={attempted ? errors.customerCity?.message : undefined}>
                          <Input icon={MapPin} {...register("customerCity")} placeholder="دمشق" />
                        </Field>
                        <Field label="العنوان التفصيلي" error={attempted ? errors.customerAddress?.message : undefined}>
                          <Input icon={MapPin} {...register("customerAddress")} placeholder="المنطقة، الشارع، البناء، الطابق" />
                        </Field>
                        <Field label="ملاحظات إضافية (اختياري)">
                          <div className="relative">
                            <div className="absolute right-3 top-3 text-muted-foreground pointer-events-none">
                              <MessageSquare size={15} />
                            </div>
                            <textarea {...register("notes")} placeholder="أي تعليمات خاصة بالتوصيل..."
                              className="w-full bg-background border border-border/60 rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40 min-h-[90px] resize-none" />
                          </div>
                        </Field>
                      </div>

                      <div className="flex gap-3 mt-8">
                        <button type="button" onClick={() => setStep(1)}
                          className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border/60 text-muted-foreground hover:text-foreground hover:border-border text-sm font-bold transition-all">
                          رجوع
                        </button>
                        <button type="button" onClick={nextStep}
                          className="btn-press flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_hsl(171_36%_52%/0.25)]">
                          التالي — مراجعة الطلب
                          <ChevronLeft size={16} />
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Step 3 — Review & confirm */}
                  <div className={step === 3 ? "block" : "hidden"}>
                    <motion.div key="step3"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="p-8"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <h2 className="font-black text-lg">مراجعة وتأكيد</h2>
                          <p className="text-muted-foreground text-xs">راجع طلبك قبل التأكيد النهائي</p>
                        </div>
                      </div>

                      {/* Order items */}
                      <div className="bg-background rounded-xl border border-border/50 overflow-hidden mb-6">
                        <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
                          <ShoppingBag size={14} className="text-primary" />
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">المنتجات</span>
                        </div>
                        <div className="divide-y divide-border/40">
                          {items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3 px-4 py-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                <img src={item.product.imageUrl} alt={item.product.nameAr} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold line-clamp-1">{item.product.nameAr}</p>
                                <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                              </div>
                              <p className="text-sm font-black text-primary flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 bg-primary/5 border-t border-primary/10 flex justify-between items-center">
                          <span className="text-sm font-black">الإجمالي</span>
                          <span className="text-lg font-black text-primary">{formatPrice(totalPrice)}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-2">
                        <button type="button" onClick={() => setStep(2)}
                          className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border/60 text-muted-foreground hover:text-foreground hover:border-border text-sm font-bold transition-all">
                          رجوع
                        </button>
                        <button type="submit" disabled={isSubmitting}
                          className="btn-press flex-1 flex items-center justify-center gap-2.5 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_hsl(171_36%_52%/0.3)] hover:shadow-[0_0_30px_hsl(171_36%_52%/0.45)] disabled:opacity-60 disabled:pointer-events-none">
                          {isSubmitting ? (
                            <><Loader2 size={16} className="animate-spin" />جاري تأكيد الطلب...</>
                          ) : (
                            <><Lock size={15} />تأكيد الطلب</>
                          )}
                        </button>
                      </div>

                      <p className="text-center text-xs text-muted-foreground/50 mt-4 flex items-center justify-center gap-1.5">
                        <Lock size={10} />
                        بياناتك محمية وآمنة
                      </p>
                    </motion.div>
                  </div>

              </form>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border/50 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/50 flex items-center gap-2">
                <ShoppingBag size={15} className="text-primary" />
                <h2 className="font-black text-sm">ملخص الطلب</h2>
                <span className="mr-auto text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-lg">{items.length} منتج</span>
              </div>

              <div className="divide-y divide-border/40 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 px-6 py-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.product.imageUrl} alt={item.product.nameAr} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold line-clamp-1">{item.product.nameAr}</p>
                      <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                    </div>
                    <p className="text-xs font-black text-primary">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 space-y-2.5 border-t border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">التوصيل</span>
                  <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded-lg">مجاني</span>
                </div>
              </div>

              <div className="px-6 py-4 bg-primary/5 border-t border-primary/10 flex justify-between items-center">
                <span className="font-black">الإجمالي</span>
                <span className="text-2xl font-black text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
