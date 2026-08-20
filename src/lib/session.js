import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "aumiau_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const SESSION_ISSUER = "aumiau-shop";
const SESSION_AUDIENCE = "aumiau-shop-web";

function obterChaveSecreta() {
  const segredo = process.env.AUTH_SECRET;

  if (!segredo) {
    throw new Error("A variável AUTH_SECRET não foi configurada.");
  }

  return new TextEncoder().encode(segredo);
}

export async function criarTokenSessao(usuario) {
  return new SignJWT({
    nome: usuario.nome,
    email: usuario.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(usuario.id))
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(obterChaveSecreta());
}

export async function verificarTokenSessao(token) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, obterChaveSecreta(), {
      algorithms: ["HS256"],
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
    });

    const id = Number(payload.sub);

    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      typeof payload.nome !== "string" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return {
      id,
      nome: payload.nome,
      email: payload.email,
    };
  } catch {
    return null;
  }
}