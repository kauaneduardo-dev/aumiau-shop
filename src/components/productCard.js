export default function ProductCard({ product }) {
  return (
    <div className="overflow-hidden rounded-xl border border-orange-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
          {product.category}
        </span>

        <h2 className="mt-4 text-xl font-bold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {product.description}
        </p>

        <p className="mt-4 text-2xl font-bold text-orange-500">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>

        <a
          href={`/produtos/${product.id}`}
          className="mt-5 block rounded-lg bg-orange-500 px-4 py-3 text-center font-semibold text-white hover:bg-orange-600"
        >
          Ver detalhes
        </a>
      </div>
    </div>
  );
}