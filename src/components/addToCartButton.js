"use client";

import { useState } from "react";

export default function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false);

  function addToCart() {
    const savedCart = localStorage.getItem("aumiau-cart");
    const cart = savedCart ? JSON.parse(savedCart) : [];

    const productExists = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (productExists) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("aumiau-cart", JSON.stringify(updatedCart));

    setAdded(true);
  }

  if (added) {
    return (
      <a
        href="/carrinho"
        className="rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white hover:bg-green-700"
      >
        Adicionado! Ver carrinho
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={addToCart}
      className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
    >
      Adicionar ao carrinho
    </button>
  );
}