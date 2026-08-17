import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const dados = await request.json();

    const nome = dados.nome?.trim();
    const email = dados.email?.trim().toLowerCase();
    const senha = dados.senha;

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { message: "Preencha todos os campos." },
        { status: 400 },
      );
    }

    if (nome.length < 3 || nome.length > 120) {
      return NextResponse.json(
        { message: "Digite um nome válido." },
        { status: 400 },
      );
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email) || email.length > 190) {
      return NextResponse.json(
        { message: "Digite um e-mail válido." },
        { status: 400 },
      );
    }

    if (senha.length < 6 || senha.length > 72) {
      return NextResponse.json(
        { message: "A senha deve ter entre 6 e 72 caracteres." },
        { status: 400 },
      );
    }

    const [usuariosExistentes] = await pool.execute(
      "SELECT id FROM usuarios WHERE email = ? LIMIT 1",
      [email],
    );

    if (usuariosExistentes.length > 0) {
      return NextResponse.json(
        { message: "Este e-mail já está cadastrado." },
        { status: 409 },
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [resultado] = await pool.execute(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
      [nome, email, senhaHash],
    );

    return NextResponse.json(
      {
        message: "Conta criada com sucesso!",
        user: {
          id: resultado.insertId,
          nome,
          email,
        },
      },
      { status: 201 },
    );
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);

    if (erro.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Este e-mail já está cadastrado." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Erro interno ao criar a conta." },
      { status: 500 },
    );
  }
}