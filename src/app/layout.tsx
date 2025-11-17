import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/contexts/cart-context";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kerstverlichtingonline.nl"),
  title: {
    default: "Kerstverlichtingonline.nl | Moderne kerstshop",
    template: "%s · Kerstverlichtingonline.nl",
  },
  description:
    "Moderne kerstshop voor vlaggenmast-verlichting, LED bomen en accessoires. Exclusieve selectie voor particuliere tuinen in Nederland.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://kerstverlichtingonline.nl",
    siteName: "Kerstverlichtingonline.nl",
    title: "Kerstverlichtingonline.nl",
    description:
      "Shop hoogwaardige kerstverlichting voor vlaggenmasten en buitenruimtes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
