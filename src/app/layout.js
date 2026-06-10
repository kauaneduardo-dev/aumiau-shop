import "./globals.css";

export const metadata = {
  title: "AuMiau Shop",
  description: "Loja online de produtos para cães e gatos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
