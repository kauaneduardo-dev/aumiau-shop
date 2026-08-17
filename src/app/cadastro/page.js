"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SiteHeader from "@/components/siteHeader";

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  async function cadastrar(event) {
    event.preventDefault();
    setMensagem("");

    if (senha !== confirmarSenha) {
      setTipoMensagem("erro");
      setMensagem("As senhas não são iguais.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("/api/auth/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(dados.message || "Não foi possível criar a conta.");
      }

      setTipoMensagem("sucesso");
      setMensagem("Conta criada com sucesso!");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (erro) {
      setTipoMensagem("erro");
      setMensagem(erro.message || "Não foi possível criar a conta.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-orange-50 text-gray-900">
      <SiteHeader backHref="/login" backLabel="Voltar para o login" />

      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-orange-200 bg-white p-7 shadow-sm sm:p-9">
          <p className="font-semibold text-teal-700">Novo cliente</p>

          <h1 className="mt-2 text-3xl font-bold">Crie sua conta</h1>

          <p className="mt-2 text-gray-600">
            Preencha seus dados para entrar na AuMiau Shop.
          </p>

          <form className="mt-8 space-y-5" onSubmit={cadastrar}>
            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm font-semibold"
              >
                Nome completo
              </label>

              <input
                id="nome"
                name="nome"
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Digite seu nome"
                autoComplete="name"
                required
                minLength={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

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
                placeholder="Crie uma senha"
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmarSenha"
                className="mb-2 block text-sm font-semibold"
              >
                Confirmar senha
              </label>

              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                placeholder="Digite a senha novamente"
                autoComplete="new-password"
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
              {carregando ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          {mensagem ? (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                tipoMensagem === "erro" ? "text-red-600" : "text-teal-700"
              }`}
            >
              {mensagem}
            </p>
          ) : null}

          <p className="mt-6 text-center text-sm text-gray-600">
            Já possui uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              Entrar
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}