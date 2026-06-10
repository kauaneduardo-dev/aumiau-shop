import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/addToCartButton";
import SiteHeader from "@/components/siteHeader";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";

export function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="min-h-screen bg-orange-50 text-gray-900">
        <SiteHeader backHref="/produtos" backLabel="Voltar para produtos" />

        <section className="px-5 py-10 sm:px-8">
          <h1 className="text-3xl font-bold text-orange-500">
            Produto não encontrado
          </h1>

          <p className="mt-2 text-gray-600">
            Esse produto não existe na AuMiau Shop.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <SiteHeader backHref="/produtos" backLabel="Voltar para produtos" />

      <section className="grid grid-cols-1 gap-8 px-5 py-10 sm:px-8 md:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm md:min-h-[520px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
              {product.category}
            </span>
            <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
              {product.audience}
            </span>
          </div>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            {product.name}
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            {product.description}
          </p>

          <p className="mt-6 text-4xl font-bold text-orange-500">
            {formatCurrency(product.price)}
          </p>

          <p className="mt-3 text-sm font-semibold text-teal-700">
            {product.stock} unidades disponíveis
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <AddToCartButton product={product} />

            <Link
              href="/produtos"
              className="rounded-lg border border-orange-300 px-6 py-3 text-center font-semibold text-orange-600 hover:bg-orange-100"
            >
              Ver mais produtos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
