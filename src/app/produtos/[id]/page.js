import { products } from "../../../data/products";
import AddToCartButton from "../../../components/addToCartButton";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="min-h-screen bg-orange-50 px-8 py-10 text-gray-900">
        <a
          href="/produtos"
          className="text-sm text-gray-500 hover:text-orange-500"
        >
          ← Voltar para produtos
        </a>

        <h1 className="mt-8 text-3xl font-bold text-orange-500">
          Produto não encontrado
        </h1>

        <p className="mt-2 text-gray-600">
          Esse produto não existe na AuMiau Shop.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <header className="border-b border-orange-200 bg-white px-8 py-6">
        <a
          href="/produtos"
          className="text-sm text-gray-500 hover:text-orange-500"
        >
          ← Voltar para produtos
        </a>

        <h1 className="mt-4 text-3xl font-bold text-orange-500">
          {product.name}
        </h1>

        <p className="mt-2 text-gray-600">
          Produto da categoria: {product.category}
        </p>
      </header>

      <section className="grid grid-cols-1 gap-10 px-8 py-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-orange-200 bg-white shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="h-[420px] w-full object-cover"
          />
        </div>

        <div className="rounded-xl border border-orange-200 bg-white p-8 shadow-sm">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
            {product.category}
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            {product.name}
          </h2>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <p className="mt-6 text-4xl font-bold text-orange-500">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <AddToCartButton product={product} />

            <a
              href="/produtos"
              className="rounded-lg border border-orange-300 px-6 py-3 text-center font-semibold text-orange-600 hover:bg-orange-100"
            >
              Ver mais produtos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}