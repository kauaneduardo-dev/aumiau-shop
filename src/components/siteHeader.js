"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { getCartTotalItems } from "@/lib/cart";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/carrinho", label: "Carrinho" },
];

export default function SiteHeader({ backHref, backLabel }) {
  const cart = useCart();
  const cartCount = getCartTotalItems(cart);

  return (
    <header className="border-b border-orange-200 bg-white px-5 py-4 text-gray-900 sm:px-8">
      {backHref ? (
        <Link
          href={backHref}
          className="text-sm font-medium text-gray-500 hover:text-orange-500"
        >
          ← {backLabel}
        </Link>
      ) : null}

      <div className="mt-3 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          AuMiau Shop
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold sm:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-orange-500"
            >
              {item.label}
              {item.href === "/carrinho" && cartCount > 0 ? (
                <span className="ml-2 rounded-full bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-700">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
