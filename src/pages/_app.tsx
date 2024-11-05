import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";
import { CartProvider as ShoppingCartProvider } from "use-shopping-cart";
import Link from "next/link";
import { CartProvider } from "./_cartContext";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <img src={logoImg.src} alt="" />
        </Link>
      </Header>
      <ShoppingCartProvider
        cartMode="checkout-session"
        stripe={process.env.STRIPE_PUBLIC_KEY}
        currency="BRL"
        shouldPersist
      >
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ShoppingCartProvider>
    </Container>
  );
}
