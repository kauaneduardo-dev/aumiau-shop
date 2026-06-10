"use client";

import Link from "next/link";
import { useState } from "react";
import { addProductToCart } from "@/lib/cart";

export default function AddToCartButton({ product, className = "" }) {
  const [added, setAdded] = useState(false);
  const buttonClassName = `inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold ${className}`;

  function addToCart() {
    addProductToCart(product);
    setAdded(true);
  }

  if (added) {
    return (
      <Link
        href="/carrinho"
        className={`${buttonClassName} bg-teal-600 text-center text-white hover:bg-teal-700`}
      >
        Adicionado! Ver carrinho
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={addToCart}
      className={`${buttonClassName} bg-orange-500 text-white hover:bg-orange-600`}
    >
      Adicionar ao carrinho
    </button>
  );
}
