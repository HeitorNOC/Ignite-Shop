import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { ProductDetails } from "../styles/pages/product";
import { SidebarContainer, ProductList, ProductItem, RemoveButton, Footer, QuantityInfo, TotalAmount, CheckoutButton } from "../styles/pages/sidebar";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  defaultPriceId: string;
}

interface SidebarProps {
  products: Product[];
  onRemove: (productId: string) => void;
}

export default function Sidebar({ products, onRemove }: SidebarProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const productCounts = products.reduce((acc, product) => {
    acc[product.id] = acc[product.id] ? acc[product.id] + 1 : 1;
    return acc;
  }, {} as Record<string, number>);

  const totalAmount = products.reduce((acc, product) => {
    const price = parseFloat(product.price.replace("R$", "").replace(",", "."));
    return acc + price;
  }, 0);

  async function handleCheckout() {
    setIsProcessing(true);
    try {
      const items = Object.entries(productCounts).map(([productId, quantity]) => {
        const product = products.find((p) => p.id === productId)!;
        console.log("Product for checkout:", product);
        return {
          priceId: product.defaultPriceId, 
          quantity: quantity,
        };
      });

      console.log("Items for Stripe checkout:", items);

      const response = await axios.post("/api/checkout", { items });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl; 
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to proceed to checkout. Please try again.");
      setIsProcessing(false);
    }
  }

  return (
    <SidebarContainer>
      <h2>Sacola de compras</h2>
      <ProductList>
        {Object.entries(productCounts).map(([productId, quantity]) => {
          const product = products.find((p) => p.id === productId)!;
          const price = parseFloat(product.price.replace("R$", "").replace(",", "."));
          const totalPrice = (price * quantity).toFixed(2);

          return (
            <ProductItem key={productId}>
              <Image src={product.imageUrl} width={100} height={100} alt={product.name} />
              <ProductDetails>
                <strong>{product.name}</strong>
                <span>R$ {totalPrice}</span>
                <p>Quantidade: {quantity}</p>
                <RemoveButton onClick={() => onRemove(productId)}>Remover</RemoveButton>
              </ProductDetails>
            </ProductItem>
          );
        })}
      </ProductList>
      <Footer>
        <QuantityInfo>
          <span>Quantidade</span>
          <strong>{products.length} itens</strong>
        </QuantityInfo>
        <TotalAmount>
          <span>Valor total</span>
          <strong>R$ {totalAmount.toFixed(2)}</strong>
        </TotalAmount>
        <CheckoutButton onClick={handleCheckout} disabled={isProcessing}>
          {isProcessing ? "Processando..." : "Finalizar compra"}
        </CheckoutButton>
      </Footer>
    </SidebarContainer>
  );
}
