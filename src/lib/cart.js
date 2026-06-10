export const CART_STORAGE_KEY = "aumiau-cart";
export const CART_UPDATED_EVENT = "aumiau-cart-updated";

function normalizeCartItem(item) {
  return {
    id: Number(item.id),
    name: String(item.name || ""),
    price: Number(item.price) || 0,
    image: String(item.image || ""),
    quantity: Math.max(1, Number(item.quantity) || 1),
  };
}

export function getCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart
      .filter((item) => item && item.id && item.name)
      .map(normalizeCartItem);
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedCart = cart.map(normalizeCartItem);

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizedCart));
  window.dispatchEvent(
    new CustomEvent(CART_UPDATED_EVENT, { detail: normalizedCart }),
  );
}

export function addProductToCart(product) {
  const cart = getCart();
  const productExists = cart.find((item) => item.id === product.id);

  const updatedCart = productExists
    ? cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      )
    : [
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];

  saveCart(updatedCart);

  return updatedCart;
}

export function getCartTotalItems(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
