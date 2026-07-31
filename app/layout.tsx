import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sleep House Ipiranga | Marcas premium de colchão em São Paulo",
  description:
    "Compare Tempur, Pikolin, Stearns & Foster e American Sleep com consultoria especializada, entrega rápida, montagem gratuita e até 12x sem juros.",
  icons: {
    icon: "/brand/sleep-house/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
