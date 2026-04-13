import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24">
      <div className="text-8xl font-black text-primary mb-4">404</div>
      <h1 className="text-3xl font-black mb-4">الصفحة غير موجودة</h1>
      <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على هذه الصفحة.</p>
      <Link href="/" className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-black hover:bg-primary/90 transition-all">العودة للرئيسية</Link>
    </div>
  );
}
