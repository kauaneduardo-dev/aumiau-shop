"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { getCartTotalItems } from "@/lib/cart";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/carrinho", label: "Carrinho" },
];

export default function SiteHeader({ backHref, backLabel }) {
  const cart = useCart();
  const cartCount = getCartTotalItems(cart);

  const [usuario, setUsuario] = useState(null);
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    let componenteAtivo = true;

    async function carregarUsuario() {
      try {
        const resposta = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!resposta.ok) {
          return;
        }

        const dados = await resposta.json();

        if (componenteAtivo) {
          setUsuario(dados.user);
        }
      } catch {
        if (componenteAtivo) {
          setUsuario(null);
        }
      } finally {
        if (componenteAtivo) {
          setCarregandoUsuario(false);
        }
      }
    }

    carregarUsuario();

    return () => {
      componenteAtivo = false;
    };
  }, []);

  async function sair() {
    setSaindo(true);

    try {
      const resposta = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!resposta.ok) {
        return;
      }

      setUsuario(null);
      window.location.href = "/";
    } finally {
      setSaindo(false);
    }
  }

  const primeiroNome = usuario?.nome?.split(" ")[0];

  return (
    <header className="border-b border-orange-200 bg-white px-5 py-4 text-gray-900 sm:px-8">
      {backHref ? (
        <Link
          href={backHref}
          className="text-sm font-medium text-gray-500 hover:text-orange-500"
        >
          ← {backLabel}
        </Link>
      ) : null}

      <div className="mt-3 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          AuMiau Shop
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold sm:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-orange-500"
            >
              {item.label}

              {item.href === "/carrinho" && cartCount > 0 ? (
                <span className="ml-2 rounded-full bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-700">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          ))}

          {!carregandoUsuario && !usuario ? (
            <Link
              href="/login"
              className="text-gray-700 hover:text-orange-500"
            >
              Entrar
            </Link>
          ) : null}

          {!carregandoUsuario && usuario ? (
            <div className="flex items-center gap-3">
              <span className="text-teal-700">
                Olá, {primeiroNome}
              </span>

              <button
                type="button"
                onClick={sair}
                disabled={saindo}
                className="rounded-lg border border-orange-300 px-3 py-1.5 text-orange-600 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saindo ? "Saindo..." : "Sair"}
              </button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}