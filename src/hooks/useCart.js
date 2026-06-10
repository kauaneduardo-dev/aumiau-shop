"use client";

import { useSyncExternalStore } from "react";
import { CART_STORAGE_KEY, CART_UPDATED_EVENT, getCart } from "@/lib/cart";

let lastSavedCart = null;
let lastCartSnapshot = [];

function subscribeToCart(callback) {
  window.addEventListener(CART_UPDATED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CART_UPDATED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useCart() {
  return useSyncExternalStore(subscribeToCart, getCartSnapshot, () => []);
}

function getCartSnapshot() {
  const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);

  if (savedCart === lastSavedCart) {
    return lastCartSnapshot;
  }

  lastSavedCart = savedCart;
  lastCartSnapshot = getCart();

  return lastCartSnapshot;
}
