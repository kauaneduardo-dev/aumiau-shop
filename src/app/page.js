export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <header className="flex items-center justify-between border-b border-orange-200 bg-white px-8 py-6">
        <h1 className="text-2xl font-bold text-orange-500">AuMiau Shop</h1>

        <nav className="flex gap-6 text-sm font-medium">
          <a href="/" className="hover:text-orange-500">
            Início
          </a>

          <a href="/produtos" className="hover:text-orange-500">
            Produtos
          </a>

          <a href="/carrinho" className="hover:text-orange-500">
            Carrinho
          </a>
        </nav>
      </header>

      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 font-semibold text-orange-500">
          Para cães, gatos e muito amor
        </p>

        <h2 className="max-w-4xl text-4xl font-bold md:text-6xl">
          Produtos úteis, fofos e práticos para cuidar melhor do seu pet
        </h2>

        <p className="mt-6 max-w-2xl text-gray-600">
          A AuMiau Shop é uma loja online feita para quem ama pets e quer
          encontrar produtos que deixam a rotina dos cães e gatos mais feliz,
          confortável e divertida.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/produtos"
            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Ver produtos
          </a>

          <a
            href="#categorias"
            className="rounded-lg border border-orange-300 px-6 py-3 font-semibold text-orange-600 hover:bg-orange-100"
          >
            Ver categorias
          </a>
        </div>
      </section>

      <section
        id="categorias"
        className="grid grid-cols-1 gap-6 px-8 pb-16 md:grid-cols-3"
      >
        <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-bold">Produtos para cães</h3>
          <p className="text-gray-600">
            Coleiras, camas, brinquedos, comedouros e acessórios para deixar seu
            cachorro mais feliz.
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-bold">Produtos para gatos</h3>
          <p className="text-gray-600">
            Arranhadores, brinquedos, varinhas, casinhas e itens para conforto
            dos gatos.
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-bold">Cuidados e bem-estar</h3>
          <p className="text-gray-600">
            Produtos para alimentação, hidratação, descanso e saúde do seu pet.
          </p>
        </div>
      </section>
    </main>
  );
}