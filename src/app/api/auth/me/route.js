import { NextResponse } from "next/server";
import pool from "@/lib/db";
import {
  SESSION_COOKIE_NAME,
  verificarTokenSessao,
} from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const dadosSessao = await verificarTokenSessao(token);

    if (!dadosSessao) {
      return NextResponse.json(
        { message: "Usuário não autenticado." },
        { status: 401 },
      );
    }

    const [usuarios] = await pool.execute(
      "SELECT id, nome, email FROM usuarios WHERE id = ? LIMIT 1",
      [dadosSessao.id],
    );

    if (usuarios.length === 0) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        user: usuarios[0],
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (erro) {
    console.error("Erro ao consultar sessão:", erro);

    return NextResponse.json(
      { message: "Erro interno ao consultar a sessão." },
      { status: 500 },
    );
  }
}