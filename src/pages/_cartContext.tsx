import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  defaultPriceId: string;
}

interface CartContextData {
  cartProducts: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: (open: boolean) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function addToCart(product: Product) {
    setCartProducts((prev) => [...prev, product]);
    setIsSidebarOpen(true); 
  }

  function removeFromCart(productId: string) {
    setCartProducts((prev) => prev.filter((item) => item.id !== productId));
    if (cartProducts.length === 1) setIsSidebarOpen(false); 
  }

  function toggleSidebar(open: boolean) {
    setIsSidebarOpen(open);
  }

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart, isSidebarOpen, toggleSidebar }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
