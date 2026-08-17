import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const dados = await request.json();

    const email = dados.email?.trim().toLowerCase();
    const senha = dados.senha;

    if (!email || !senha) {
      return NextResponse.json(
        { message: "Preencha o e-mail e a senha." },
        { status: 400 },
      );
    }

    const [usuarios] = await pool.execute(
      "SELECT id, nome, email, senha_hash FROM usuarios WHERE email = ? LIMIT 1",
      [email],
    );

    if (usuarios.length === 0) {
      return NextResponse.json(
        { message: "E-mail ou senha incorretos." },
        { status: 401 },
      );
    }

    const usuario = usuarios[0];

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha_hash,
    );

    if (!senhaCorreta) {
      return NextResponse.json(
        { message: "E-mail ou senha incorretos." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "Login realizado com sucesso!",
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (erro) {
    console.error("Erro ao realizar login:", erro);

    return NextResponse.json(
      { message: "Erro interno ao realizar o login." },
      { status: 500 },
    );
  }
}