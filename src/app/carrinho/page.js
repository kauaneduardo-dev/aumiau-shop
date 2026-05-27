"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("aumiau-cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  function saveCart(updatedCart) {
    setCart(updatedCart);
    localStorage.setItem("aumiau-cart", JSON.stringify(updatedCart));
  }

  function removeItem(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
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

    saveCart(updatedCart);
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

    saveCart(updatedCart);
  }

  function clearCart() {
    saveCart([]);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <header className="border-b border-orange-200 bg-white px-8 py-6">
        <a href="/" className="text-sm text-gray-500 hover:text-orange-500">
          ← Voltar para início
        </a>

        <h1 className="mt-4 text-3xl font-bold text-orange-500">
          Carrinho de compras
        </h1>

        <p className="mt-2 text-gray-600">
          Veja os produtos adicionados na AuMiau Shop.
        </p>
      </header>

      <section className="px-8 py-10">
        {cart.length === 0 ? (
          <div className="rounded-xl border border-orange-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Seu carrinho está vazio
            </h2>

            <p className="mt-2 text-gray-600">
              Adicione um produto para continuar.
            </p>

            <a
              href="/produtos"
              className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Ver produtos
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border border-orange-200 bg-white p-4 shadow-sm md:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 w-full rounded-lg object-cover md:w-40"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {item.name}
                      </h2>

                      <p className="mt-1 font-bold text-orange-500">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="rounded-lg border border-orange-300 px-3 py-1 font-bold text-orange-600 hover:bg-orange-100"
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        Quantidade: {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="rounded-lg border border-orange-300 px-3 py-1 font-bold text-orange-600 hover:bg-orange-100"
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

            <aside className="h-fit rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                Resumo do pedido
              </h2>

              <p className="mt-4 text-gray-600">
                Total de itens: <strong>{totalItems}</strong>
              </p>

              <p className="mt-4 text-3xl font-bold text-orange-500">
                R$ {total.toFixed(2).replace(".", ",")}
              </p>

              <a
                href="/checkout"
                className="mt-6 block w-full rounded-lg bg-orange-500 px-6 py-3 text-center font-semibold text-white hover:bg-orange-600"
              >
                Finalizar compra
              </a>

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