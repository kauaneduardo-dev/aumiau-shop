"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [orderFinished, setOrderFinished] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("aumiau-cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    setCart(parsedCart);
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  function finishOrder(event) {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      alert("Preencha todos os campos antes de finalizar.");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const order = {
      customer: formData,
      items: cart,
      total: total,
      createdAt: new Date().toLocaleString("pt-BR"),
    };

    localStorage.setItem("aumiau-last-order", JSON.stringify(order));
    localStorage.removeItem("aumiau-cart");

    setCart([]);
    setOrderFinished(true);
  }

  if (orderFinished) {
    return (
      <main className="min-h-screen bg-orange-50 px-8 py-10 text-gray-900">
        <div className="mx-auto max-w-2xl rounded-xl border border-orange-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-4xl font-bold text-orange-500">
            Pedido finalizado!
          </h1>

          <p className="mt-4 text-gray-600">
            Seu pedido foi registrado com sucesso na AuMiau Shop.
          </p>

          <p className="mt-2 text-gray-600">
            Essa ainda é uma finalização de teste. Depois vamos colocar banco de
            dados e pagamento.
          </p>

          <a
            href="/produtos"
            className="mt-8 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Voltar para produtos
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <header className="border-b border-orange-200 bg-white px-8 py-6">
        <a
          href="/carrinho"
          className="text-sm text-gray-500 hover:text-orange-500"
        >
          ← Voltar para o carrinho
        </a>

        <h1 className="mt-4 text-3xl font-bold text-orange-500">Checkout</h1>

        <p className="mt-2 text-gray-600">
          Preencha seus dados para finalizar o pedido.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-8 px-8 py-10 lg:grid-cols-3">
        <form
          onSubmit={finishOrder}
          className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Dados do cliente
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold">
                Nome completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                placeholder="Digite seu nome"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                placeholder="seuemail@gmail.com"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Telefone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                placeholder="(19) 99999-9999"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Cidade</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                placeholder="Sua cidade"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block font-semibold">Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                placeholder="Rua, número e bairro"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Confirmar pedido
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Resumo do pedido
          </h2>

          {cart.length === 0 ? (
            <p className="mt-4 text-gray-600">Seu carrinho está vazio.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="border-b border-orange-100 pb-3">
                  <p className="font-bold text-gray-900">{item.name}</p>

                  <p className="text-sm text-gray-600">
                    Quantidade: {item.quantity}
                  </p>

                  <p className="font-semibold text-orange-500">
                    R${" "}
                    {(item.price * item.quantity)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                </div>
              ))}

              <p className="pt-2 text-gray-600">
                Total de itens: <strong>{totalItems}</strong>
              </p>

              <p className="text-3xl font-bold text-orange-500">
                R$ {total.toFixed(2).replace(".", ",")}
              </p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}