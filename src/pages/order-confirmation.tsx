import { Link } from "wouter";
import { CheckCircle2, Package, MapPin, Phone } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";

export default function OrderConfirmation({ params }: { params: { id: string } }) {
  const order: Order | null = (() => {
    const saved = localStorage.getItem(`order-${params.id}`);
    return saved ? JSON.parse(saved) : null;
  })();

  if (!order) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center pt-24">
      <h1 className="text-3xl font-black mb-4">الطلب غير موجود</h1>
      <Link href="/" className="text-primary hover:underline font-bold">العودة للرئيسية</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 pt-28 pb-24 max-w-4xl">
      <div className="bg-card border border-border/60 rounded-lg overflow-hidden">
        <div className="bg-primary/10 border-b border-primary/20 p-10 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground mb-6 shadow-lg shadow-primary/20">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4">تم تأكيد طلبك بنجاح!</h1>
          <p className="text-muted-foreground max-w-md">شكراً لتسوقك من Two Wheels. سنتواصل معك عبر الإنستاغرام قريباً.</p>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-black mb-5 pb-2 border-b border-border/60 flex items-center gap-2"><Package className="text-primary" size={18} />تفاصيل الطلب</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">رقم الطلب</span><span className="font-black font-mono">#{order.id.toString().slice(-6)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">تاريخ الطلب</span><span className="font-bold">{new Date(order.createdAt).toLocaleDateString("ar-SY")}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">الحالة</span><span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-black">قيد المراجعة</span></div>
                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-border/60">
                    <span className="font-black">الإجمالي</span>
                    <span className="text-2xl font-black text-primary">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-black mb-5 pb-2 border-b border-border/60 flex items-center gap-2"><MapPin className="text-primary" size={18} />معلومات التوصيل</h2>
                <div className="space-y-3 text-sm">
                  <div><div className="text-muted-foreground mb-0.5">الاسم</div><div className="font-bold">{order.customerName}</div></div>
                  <div><div className="text-muted-foreground mb-0.5 flex items-center gap-1"><Phone size={12} />رقم الهاتف</div><div className="font-bold" dir="ltr">{order.customerPhone}</div></div>
                  <div><div className="text-muted-foreground mb-0.5">العنوان</div><div className="font-bold">{order.customerCity} - {order.customerAddress}</div></div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-black mb-5 pb-2 border-b border-border/60">المنتجات المطلوبة</h2>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-background rounded-lg border border-border/60">
                    <div>
                      <div className="font-bold text-sm mb-0.5">{item.productNameAr}</div>
                      <div className="text-muted-foreground text-xs">الكمية: {item.quantity}</div>
                    </div>
                    <div className="font-black text-primary">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/products" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-md font-black text-base hover:bg-primary/90 transition-all hover:scale-[1.02]">
              مواصلة التسوق
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
