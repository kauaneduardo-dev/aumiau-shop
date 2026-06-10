"use client";

import Link from "next/link";
import { useState } from "react";
import SiteHeader from "@/components/siteHeader";
import { useCart } from "@/hooks/useCart";
import { getCartTotal, getCartTotalItems } from "@/lib/cart";
import { formatCurrency } from "@/lib/format";

const whatsappNumber = "5519997326163";

export default function CheckoutPage() {
  const cart = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const totalItems = getCartTotalItems(cart);
  const total = getCartTotal(cart);

  function finishByWhatsApp(event) {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.city ||
      !formData.address
    ) {
      alert("Preencha todos os campos antes de finalizar pelo WhatsApp.");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const productsMessage = cart
      .map((item) => {
        const subtotal = item.price * item.quantity;

        return `- ${item.name}
Quantidade: ${item.quantity}
Valor: ${formatCurrency(subtotal)}`;
      })
      .join("\n\n");

    const message = `Olá! Tenho interesse em comprar produtos da AuMiau Shop.

Produtos escolhidos:

${productsMessage}

Total de itens: ${totalItems}
Total aproximado: ${formatCurrency(total)}

Dados do cliente:
Nome: ${formData.name}
Telefone: ${formData.phone}
Cidade: ${formData.city}
Endereço: ${formData.address}

Gostaria de saber como finalizar a compra.`;

    const order = {
      id: `AM-WPP-${Date.now()}`,
      customer: formData,
      items: cart,
      total,
      channel: "WhatsApp",
      createdAt: new Date().toLocaleString("pt-BR"),
    };

    localStorage.setItem("aumiau-last-order", JSON.stringify(order));

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <SiteHeader backHref="/carrinho" backLabel="Voltar para o carrinho" />

      <section className="grid grid-cols-1 gap-8 px-5 py-10 sm:px-8 lg:grid-cols-3">
        <form
          onSubmit={finishByWhatsApp}
          className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <p className="font-semibold text-teal-700">Finalização</p>
          <h2 className="text-2xl font-bold text-gray-900">
            Finalizar pelo WhatsApp
          </h2>

          <p className="mt-2 text-gray-600">
            Preencha seus dados e envie o pedido direto para a AuMiau Shop.
          </p>

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
                required
                className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                placeholder="Digite seu nome"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Telefone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
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
                required
                className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                placeholder="Sua cidade"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                placeholder="Rua, número e bairro"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
          >
            Enviar pedido pelo WhatsApp
          </button>

          <p className="mt-4 text-sm text-gray-500">
            O pagamento e a confirmação serão combinados pelo WhatsApp.
          </p>
        </form>

        <aside className="h-fit rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Resumo do pedido
          </h2>

          {cart.length === 0 ? (
            <div>
              <p className="mt-4 text-gray-600">Seu carrinho está vazio.</p>

              <Link
                href="/produtos"
                className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
              >
                Ver produtos
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="border-b border-orange-100 pb-3">
                  <p className="font-bold text-gray-900">{item.name}</p>

                  <p className="text-sm text-gray-600">
                    Quantidade: {item.quantity}
                  </p>

                  <p className="font-semibold text-orange-500">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}

              <p className="pt-2 text-gray-600">
                Total de itens: <strong>{totalItems}</strong>
              </p>

              <p className="text-3xl font-bold text-orange-500">
                {formatCurrency(total)}
              </p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
