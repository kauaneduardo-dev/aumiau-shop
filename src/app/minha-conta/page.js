import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/siteHeader";
import pool from "@/lib/db";
import {
  SESSION_COOKIE_NAME,
  verificarTokenSessao,
} from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function MinhaContaPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const dadosSessao = await verificarTokenSessao(token);

  if (!dadosSessao) {
    redirect("/login");
  }

  const [usuarios] = await pool.execute(
    "SELECT id, nome, email FROM usuarios WHERE id = ? LIMIT 1",
    [dadosSessao.id],
  );

  if (usuarios.length === 0) {
    redirect("/login");
  }

  const usuario = usuarios[0];
  const inicial = usuario.nome.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <SiteHeader backHref="/" backLabel="Voltar para o início" />

      <section className="mx-auto w-full max-w-3xl px-5 py-12">
        <div className="rounded-2xl border border-orange-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-3xl font-bold text-orange-600">
              {inicial}
            </div>

            <div>
              <p className="font-semibold text-teal-700">
                Área do cliente
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                Minha conta
              </h1>

              <p className="mt-2 text-gray-600">
                Consulte os dados usados na AuMiau Shop.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Nome
              </p>

              <p className="mt-2 text-lg font-semibold">
                {usuario.nome}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm font-semibold text-gray-500">
                E-mail
              </p>

              <p className="mt-2 break-all text-lg font-semibold">
                {usuario.email}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-5">
            <p className="font-semibold text-teal-800">
              Conta ativa
            </p>

            <p className="mt-1 text-sm text-teal-700">
              Sua sessão está protegida e funcionando corretamente.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/produtos"
              className="rounded-lg bg-orange-500 px-5 py-3 text-center font-semibold text-white hover:bg-orange-600"
            >
              Ver produtos
            </Link>

            <Link
              href="/carrinho"
              className="rounded-lg border border-orange-300 px-5 py-3 text-center font-semibold text-orange-600 hover:bg-orange-50"
            >
              Ver carrinho
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}