"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/productCard";

export default function ProductCatalog({ products }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [audience, setAudience] = useState("Todos");
  const [sortBy, setSortBy] = useState("featured");

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const audiences = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.audience))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesSearch =
          !normalizedSearch ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.description.toLowerCase().includes(normalizedSearch);

        const matchesCategory =
          category === "Todos" || product.category === category;

        const matchesAudience =
          audience === "Todos" || product.audience === audience;

        return matchesSearch && matchesCategory && matchesAudience;
      })
      .sort((firstProduct, secondProduct) => {
        if (sortBy === "price-asc") {
          return firstProduct.price - secondProduct.price;
        }

        if (sortBy === "price-desc") {
          return secondProduct.price - firstProduct.price;
        }

        return Number(secondProduct.featured) - Number(firstProduct.featured);
      });
  }, [audience, category, products, search, sortBy]);

  return (
    <section className="px-5 py-8 sm:px-8">
      <div className="rounded-lg border border-orange-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label
              htmlFor="product-search"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Buscar
            </label>
            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
              placeholder="Nome ou descrição"
            />
          </div>

          <div>
            <label
              htmlFor="product-category"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Categoria
            </label>
            <select
              id="product-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="product-audience"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Pet
            </label>
            <select
              id="product-audience"
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
            >
              {audiences.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="product-sort"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Ordenar
            </label>
            <select
              id="product-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full rounded-lg border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="featured">Destaques primeiro</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-600">
          {filteredProducts.length} produto
          {filteredProducts.length === 1 ? "" : "s"} encontrado
          {filteredProducts.length === 1 ? "" : "s"}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-orange-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Nenhum produto encontrado
          </h2>
          <p className="mt-2 text-gray-600">
            Tente buscar por outro nome ou mudar os filtros.
          </p>
        </div>
      )}
    </section>
  );
}
