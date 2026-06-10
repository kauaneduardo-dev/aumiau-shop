import ProductCatalog from "@/components/productCatalog";
import SiteHeader from "@/components/siteHeader";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <SiteHeader backHref="/" backLabel="Voltar para início" />

      <section className="px-5 pt-8 sm:px-8">
        <p className="font-semibold text-teal-700">Catálogo</p>
        <h1 className="mt-1 text-3xl font-bold text-orange-500">
          Produtos AuMiau Shop
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Encontre itens úteis, fofos e práticos para cães e gatos.
        </p>
      </section>

      <ProductCatalog products={products} />
    </main>
  );
}
