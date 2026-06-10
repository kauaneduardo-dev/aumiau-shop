import Link from "next/link";
import ProductCard from "@/components/productCard";
import SiteHeader from "@/components/siteHeader";
import { products } from "@/data/products";

export default function Home() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <SiteHeader />

      <section
        className="flex min-h-[68vh] items-end bg-cover bg-center px-5 py-12 text-white sm:px-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17, 24, 39, 0.42), rgba(17, 24, 39, 0.68)), url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600')",
        }}
      >
        <div className="max-w-4xl">
          <p className="mb-4 font-semibold text-orange-100">
            Para cães, gatos e muito amor
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            AuMiau Shop
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-orange-50">
            Produtos úteis, fofos e práticos para deixar a rotina dos pets mais
            feliz, confortável e divertida.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/produtos"
              className="rounded-lg bg-orange-500 px-6 py-3 text-center font-semibold text-white hover:bg-orange-600"
            >
              Ver produtos
            </Link>

            <Link
              href="#categorias"
              className="rounded-lg border border-white/70 px-6 py-3 text-center font-semibold text-white hover:bg-white/10"
            >
              Ver categorias
            </Link>
          </div>
        </div>
      </section>

      <section
        id="categorias"
        className="grid grid-cols-1 gap-6 px-5 py-10 sm:px-8 md:grid-cols-3"
      >
        <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-bold">Produtos para cães</h3>
          <p className="text-gray-600">
            Coleiras, camas, brinquedos, comedouros e acessórios para deixar seu
            cachorro mais feliz.
          </p>
        </div>

        <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-bold">Produtos para gatos</h3>
          <p className="text-gray-600">
            Arranhadores, brinquedos, varinhas, casinhas e itens para conforto
            dos gatos.
          </p>
        </div>

        <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-bold">Cuidados e bem-estar</h3>
          <p className="text-gray-600">
            Produtos para alimentação, hidratação, descanso e saúde do seu pet.
          </p>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-semibold text-teal-700">Destaques da loja</p>
            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              Queridinhos para começar
            </h2>
          </div>

          <Link
            href="/produtos"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Ver catálogo completo
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
