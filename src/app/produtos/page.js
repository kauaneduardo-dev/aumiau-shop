import { products } from "../../data/products";
import ProductCard from "../../components/productCard";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <header className="border-b border-orange-200 bg-white px-8 py-6">
        <a href="/" className="text-sm text-gray-500 hover:text-orange-500">
          ← Voltar para início
        </a>

        <h1 className="mt-4 text-3xl font-bold text-orange-500">
          Produtos AuMiau Shop
        </h1>

        <p className="mt-2 text-gray-600">
          Produtos úteis, fofos e práticos para cães e gatos.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 px-8 py-10 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}