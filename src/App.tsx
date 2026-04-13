import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { ToastProvider } from "@/hooks/use-toast";
import { AppLayout } from "@/components/layout/AppLayout";

import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import OrderConfirmation from "@/pages/order-confirmation";
import About from "@/pages/about";
import Wishlist from "@/pages/wishlist";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <AppLayout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/products/:id" component={ProductDetail} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders/:id" component={OrderConfirmation} />
                <Route path="/about" component={About} />
                <Route path="/wishlist" component={Wishlist} />
                <Route component={NotFound} />
              </Switch>
            </AppLayout>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
