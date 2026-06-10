# Guia para usar o AuMiau Shop no notebook da escola

Este guia deixa o projeto pronto para abrir, mexer e enviar mudanças pelo notebook da escola.

## 1. Instale o que precisa

No notebook da escola, confira se tem estes programas:

- Node.js 20 ou mais novo.
- Git.
- Visual Studio Code.

Para testar no PowerShell:

```bash
node -v
npm -v
git --version
```

Se aparecer erro dizendo que `node`, `npm` ou `git` não foi reconhecido, precisa instalar o programa que faltou.

## 2. Baixe o projeto do GitHub

Abra o PowerShell e rode:

```bash
cd "$env:USERPROFILE\Documents"
git clone https://github.com/kauaneduardo-dev/aumiau-shop.git
cd aumiau-shop
npm install
npm run dev
```

Depois abra no navegador:

```text
http://localhost:3000
```

## 3. Abrir no VS Code

Com o terminal ainda na pasta do projeto:

```bash
code .
```

Se o comando `code .` não funcionar, abra o VS Code manualmente e escolha:

```text
File > Open Folder > Documents > aumiau-shop
```

## 4. Toda vez que for mexer

Antes de começar:

```bash
cd "$env:USERPROFILE\Documents\aumiau-shop"
git pull
npm install
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

## 5. Conferir se está tudo funcionando

Antes de mandar para o GitHub:

```bash
npm run check
```

Esse comando roda:

- `npm run lint`
- `npm run build`

## 6. Enviar suas mudanças para o GitHub

Depois de editar:

```bash
git status
git add .
git commit -m "Descreva o que voce mudou"
git push
```

Exemplo:

```bash
git commit -m "Atualiza produtos da loja"
```

## 7. Se a porta 3000 estiver ocupada

Rode em outra porta:

```bash
npm run dev -- --port 3001
```

E abra:

```text
http://localhost:3001
```

## 8. Se a escola bloquear instalação

Use o GitHub Codespaces:

1. Entre em https://github.com/kauaneduardo-dev/aumiau-shop
2. Clique em `Code`.
3. Abra a aba `Codespaces`.
4. Clique em `Create codespace on main`.
5. No terminal do Codespaces, rode:

```bash
npm install
npm run dev
```

O Codespaces vai mostrar um link para abrir o site no navegador.

## 9. Problemas comuns

Se aparecer `npm nao reconhecido`:

Instale o Node.js e abra um novo terminal.

Se aparecer `git nao reconhecido`:

Instale o Git e abra um novo terminal.

Se o site antigo aparecer:

Confira se voce está dentro da pasta certa:

```bash
pwd
```

O final do caminho precisa ser:

```text
aumiau-shop
```

Se ainda assim aparecer antigo, rode:

```bash
git pull
npm install
npm run dev
```
