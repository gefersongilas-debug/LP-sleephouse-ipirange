import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saúde, performance e longevidade em Pouso Alegre",
  description:
    "Clínica de estética, emagrecimento médico e cuidado corporal personalizado em Pouso Alegre, MG.",
  icons: {
    icon: "/brand/favicon_io/favicon.ico",
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
