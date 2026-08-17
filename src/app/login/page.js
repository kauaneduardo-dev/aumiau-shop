"use client";

import Link from "next/link";
import { useState } from "react";
import SiteHeader from "@/components/siteHeader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function entrar(event) {
    event.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(dados.message || "Não foi possível entrar.");
      }

      setMensagem("Login realizado com sucesso!");
    } catch (erro) {
      setMensagem(erro.message || "Não foi possível entrar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <SiteHeader backHref="/" backLabel="Voltar para o início" />

      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-2xl border border-orange-200 bg-white p-7 shadow-sm sm:p-9">
          <p className="font-semibold text-teal-700">Área do cliente</p>

          <h1 className="mt-2 text-3xl font-bold">Entre na sua conta</h1>

          <p className="mt-2 text-gray-600">
            Acesse sua conta para acompanhar seus dados e pedidos.
          </p>

          <form className="mt-8 space-y-5" onSubmit={entrar}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="mb-2 block text-sm font-semibold"
              >
                Senha
              </label>

              <input
                id="senha"
                name="senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                minLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {mensagem ? (
            <p className="mt-4 text-center text-sm font-medium text-teal-700">
              {mensagem}
            </p>
          ) : null}

          <p className="mt-6 text-center text-sm text-gray-600">
            Ainda não possui uma conta?{" "}
            <Link
              href="/cadastro"
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}