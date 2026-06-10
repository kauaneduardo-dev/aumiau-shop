import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/addToCartButton";
import { formatCurrency } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-56 w-full bg-orange-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
            {product.category}
          </span>
          <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
            {product.audience}
          </span>
        </div>

        <h2 className="mt-4 text-xl font-bold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {product.description}
        </p>

        <p className="mt-4 text-2xl font-bold text-orange-500">
          {formatCurrency(product.price)}
        </p>

        <div className="mt-auto grid gap-3 pt-5">
          <AddToCartButton product={product} className="w-full" />

          <Link
            href={`/produtos/${product.id}`}
            className="rounded-lg border border-orange-300 px-4 py-3 text-center font-semibold text-orange-600 hover:bg-orange-100"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
