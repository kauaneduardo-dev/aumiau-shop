"use client";

import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/siteHeader";
import { useCart } from "@/hooks/useCart";
import {
  getCartTotal,
  getCartTotalItems,
  saveCart,
} from "@/lib/cart";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {
  const cart = useCart();

  function updateCart(updatedCart) {
    saveCart(updatedCart);
  }

  function removeItem(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
    );

    updateCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  }

  function clearCart() {
    updateCart([]);
  }

  const totalItems = getCartTotalItems(cart);
  const total = getCartTotal(cart);

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <SiteHeader backHref="/produtos" backLabel="Continuar comprando" />

      <section className="px-5 py-10 sm:px-8">
        <p className="font-semibold text-teal-700">Seu pedido</p>
        <h1 className="mt-1 text-3xl font-bold text-orange-500">
          Carrinho de compras
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Revise os produtos adicionados antes de finalizar.
        </p>

        {cart.length === 0 ? (
          <div className="mt-8 rounded-lg border border-orange-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Seu carrinho está vazio
            </h2>

            <p className="mt-2 text-gray-600">
              Adicione um produto para continuar.
            </p>

            <Link
              href="/produtos"
              className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-lg border border-orange-200 bg-white p-4 shadow-sm md:flex-row"
                >
                  <div className="relative h-32 w-full overflow-hidden rounded-lg bg-orange-100 md:w-40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 768px) 160px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {item.name}
                      </h2>

                      <p className="mt-1 font-bold text-orange-500">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="h-9 w-9 rounded-lg border border-orange-300 font-bold text-orange-600 hover:bg-orange-100"
                        aria-label={`Diminuir quantidade de ${item.name}`}
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        Quantidade: {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="h-9 w-9 rounded-lg border border-orange-300 font-bold text-orange-600 hover:bg-orange-100"
                        aria-label={`Aumentar quantidade de ${item.name}`}
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-lg bg-red-500 px-3 py-1 font-semibold text-white hover:bg-red-600"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                Resumo do pedido
              </h2>

              <p className="mt-4 text-gray-600">
                Total de itens: <strong>{totalItems}</strong>
              </p>

              <p className="mt-4 text-3xl font-bold text-orange-500">
                {formatCurrency(total)}
              </p>

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-lg bg-orange-500 px-6 py-3 text-center font-semibold text-white hover:bg-orange-600"
              >
                Finalizar compra
              </Link>

              <button
                onClick={clearCart}
                className="mt-3 w-full rounded-lg border border-orange-300 px-6 py-3 font-semibold text-orange-600 hover:bg-orange-100"
              >
                Limpar carrinho
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
