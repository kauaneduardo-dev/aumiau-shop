export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">ShopEasy</h1>

        <nav className="flex gap-6 text-sm">
          <a href="#" className="hover:text-blue-400">Início</a>
          <a href="#" className="hover:text-blue-400">Produtos</a>
          <a href="#" className="hover:text-blue-400">Carrinho</a>
        </nav>
      </header>

      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <p className="mb-4 text-blue-400 font-semibold">
          Sua loja online criada com Next.js
        </p>

        <h2 className="text-4xl md:text-6xl font-bold max-w-3xl">
          Compre produtos úteis de forma simples, rápida e segura
        </h2>

        <p className="mt-6 max-w-2xl text-gray-300">
          A ShopEasy é uma loja online feita do zero usando Next.js,
          Tailwind CSS e futuramente banco de dados, carrinho e pagamento.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="#"
            className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
          >
            Ver produtos
          </a>

          <a
            href="#"
            className="rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Saiba mais
          </a>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-16">
        <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-2">Produtos selecionados</h3>
          <p className="text-gray-400">
            Vamos cadastrar produtos úteis para vender online.
          </p>
        </div>

        <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-2">Carrinho de compras</h3>
          <p className="text-gray-400">
            Depois vamos criar um carrinho funcional para a loja.
          </p>
        </div>

        <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-2">Pagamento online</h3>
          <p className="text-gray-400">
            No final, vamos integrar Mercado Pago para finalizar pedidos.
          </p>
        </div>
      </section>
    </main>
  );
}