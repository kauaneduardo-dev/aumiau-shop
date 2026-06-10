# Guia completo para usar o AuMiau Shop no notebook da escola

Este guia mostra como baixar, abrir, rodar, editar e enviar o projeto para o GitHub usando um notebook novo, como o da escola.

O repositório do projeto é:

```text
https://github.com/kauaneduardo-dev/aumiau-shop
```

## O que você vai fazer

Você vai:

1. Conferir se o notebook tem Node.js, Git e VS Code.
2. Baixar o projeto do GitHub.
3. Instalar as dependências.
4. Rodar o site no navegador.
5. Abrir o projeto no VS Code.
6. Fazer alterações.
7. Testar se está tudo funcionando.
8. Enviar suas mudanças para o GitHub.

## 1. Programas necessários

Antes de mexer no projeto, o notebook precisa ter estes programas:

- Node.js 20 ou mais novo.
- Git.
- Visual Studio Code.

O Node.js é necessário para rodar o projeto Next.js.

O Git é necessário para baixar o projeto e enviar alterações para o GitHub.

O VS Code é o editor onde você vai mexer nos arquivos.

## 2. Como conferir se já está instalado

Abra o PowerShell.

Para abrir o PowerShell:

1. Aperte a tecla `Windows`.
2. Digite `PowerShell`.
3. Clique em `Windows PowerShell`.

Depois rode estes comandos, um por vez:

```bash
node -v
npm -v
git --version
```

Se estiver tudo certo, vai aparecer algo parecido com:

```text
v20.11.0
10.2.4
git version 2.45.0
```

Não precisa ser exatamente igual. O importante é:

- O `node -v` precisa começar com `v20` ou número maior.
- O `npm -v` precisa mostrar uma versão.
- O `git --version` precisa mostrar uma versão.

## 3. Se algum comando não funcionar

Se aparecer uma mensagem parecida com:

```text
node não é reconhecido
```

ou:

```text
git não é reconhecido
```

significa que o programa não está instalado ou o terminal precisa ser fechado e aberto de novo.

Instale:

- Node.js: https://nodejs.org
- Git: https://git-scm.com
- VS Code: https://code.visualstudio.com

Depois de instalar, feche o PowerShell, abra de novo e teste os comandos outra vez.

Se o notebook da escola não permitir instalar programas, pule para a seção `13. Plano B: usar GitHub Codespaces`.

## 4. Escolher onde o projeto vai ficar

Use a pasta `Documents` do usuário.

No PowerShell, rode:

```bash
cd "$env:USERPROFILE\Documents"
```

Esse comando entra na pasta Documentos do notebook.

## 5. Baixar o projeto do GitHub

Ainda no PowerShell, rode:

```bash
git clone https://github.com/kauaneduardo-dev/aumiau-shop.git
```

Esse comando cria uma pasta chamada `aumiau-shop` com todos os arquivos do projeto.

Depois entre na pasta:

```bash
cd aumiau-shop
```

Para confirmar que você está no lugar certo, rode:

```bash
pwd
```

O caminho precisa terminar assim:

```text
Documents\aumiau-shop
```

## 6. Instalar as dependências

Dentro da pasta `aumiau-shop`, rode:

```bash
npm install
```

Esse comando baixa tudo que o projeto precisa para funcionar.

Pode demorar alguns minutos. Espere terminar.

Quando terminar, você deve voltar para uma linha onde consegue digitar comandos.

## 7. Rodar o projeto

Depois de instalar, rode:

```bash
npm run dev
```

Se der certo, vai aparecer algo parecido com:

```text
Local: http://localhost:3000
Ready
```

Agora abra o navegador e entre em:

```text
http://localhost:3000
```

Você deve ver a loja AuMiau Shop.

Importante: enquanto estiver mexendo no site, deixe esse terminal aberto. Ele é o servidor do projeto.

## 8. Abrir o projeto no VS Code

Abra outro PowerShell ou use o terminal integrado.

Dentro da pasta do projeto, rode:

```bash
code .
```

Esse comando abre o projeto no VS Code.

Se `code .` não funcionar:

1. Abra o VS Code manualmente.
2. Clique em `File`.
3. Clique em `Open Folder`.
4. Escolha `Documents`.
5. Escolha a pasta `aumiau-shop`.
6. Clique em `Select Folder`.

## 9. Onde mexer no projeto

Arquivos principais:

```text
src/app/page.js
```

Página inicial.

```text
src/app/produtos/page.js
```

Página do catálogo de produtos.

```text
src/app/produtos/[id]/page.js
```

Página individual de cada produto.

```text
src/app/carrinho/page.js
```

Página do carrinho.

```text
src/app/checkout/page.js
```

Página de finalizar pelo WhatsApp.

```text
src/data/products.js
```

Lista dos produtos da loja.

Se quiser mudar nome, preço, descrição ou imagem de produto, normalmente é aqui que você mexe:

```text
src/data/products.js
```

## 10. Como atualizar o projeto antes de mexer

Sempre que chegar na escola e for continuar o projeto, faça isso primeiro:

```bash
cd "$env:USERPROFILE\Documents\aumiau-shop"
git pull
npm install
npm run dev
```

O que cada comando faz:

- `cd ...` entra na pasta do projeto.
- `git pull` baixa as mudanças mais novas do GitHub.
- `npm install` garante que as dependências estão instaladas.
- `npm run dev` liga o site localmente.

Depois abra:

```text
http://localhost:3000
```

## 11. Como testar antes de enviar para o GitHub

Antes de fazer commit e push, rode:

```bash
npm run check
```

Esse comando confere duas coisas:

- Se o código está organizado corretamente.
- Se o projeto consegue gerar a versão final sem erro.

Se aparecer erro, leia a mensagem no terminal. Normalmente ela mostra o arquivo e a linha com problema.

Se passar, pode enviar para o GitHub.

## 12. Como enviar suas mudanças para o GitHub

Depois de editar e testar, rode:

```bash
git status
```

Esse comando mostra quais arquivos foram alterados.

Depois rode:

```bash
git add .
```

Esse comando prepara todos os arquivos alterados para o commit.

Agora crie o commit:

```bash
git commit -m "Descreva o que você mudou"
```

Exemplos de mensagens boas:

```bash
git commit -m "Atualiza produtos da loja"
git commit -m "Melhora página inicial"
git commit -m "Ajusta checkout pelo WhatsApp"
```

Depois envie para o GitHub:

```bash
git push
```

Quando terminar, abra o GitHub e confira se apareceu seu commit:

```text
https://github.com/kauaneduardo-dev/aumiau-shop
```

## 13. Plano B: usar GitHub Codespaces

Use este plano se a escola bloquear instalação de Node.js, Git ou VS Code.

Passo a passo:

1. Entre no GitHub.
2. Abra o repositório:

```text
https://github.com/kauaneduardo-dev/aumiau-shop
```

3. Clique no botão verde `Code`.
4. Clique na aba `Codespaces`.
5. Clique em `Create codespace on main`.
6. Espere abrir o ambiente online.
7. No terminal do Codespaces, rode:

```bash
npm install
npm run dev
```

O Codespaces vai mostrar uma mensagem perguntando se você quer abrir a porta do site.

Clique em `Open in Browser`.

Para enviar mudanças no Codespaces, use os mesmos comandos:

```bash
git status
git add .
git commit -m "Descreva o que você mudou"
git push
```

## 14. Erros comuns e como resolver

### Erro: `npm não é reconhecido`

O Node.js não está instalado ou o terminal foi aberto antes da instalação.

Resolva assim:

1. Instale o Node.js.
2. Feche o PowerShell.
3. Abra o PowerShell de novo.
4. Rode:

```bash
node -v
npm -v
```

### Erro: `git não é reconhecido`

O Git não está instalado.

Resolva assim:

1. Instale o Git.
2. Feche o PowerShell.
3. Abra o PowerShell de novo.
4. Rode:

```bash
git --version
```

### Erro: `porta 3000 ocupada`

Algum outro projeto já está usando a porta 3000.

Rode o projeto em outra porta:

```bash
npm run dev -- --port 3001
```

Depois abra:

```text
http://localhost:3001
```

### Erro: site antigo aparecendo

Confira se você está na pasta certa:

```bash
pwd
```

O final precisa ser:

```text
aumiau-shop
```

Depois atualize:

```bash
git pull
npm install
npm run dev
```

No navegador, aperte:

```text
Ctrl + Shift + R
```

Isso força atualizar a página sem usar cache antigo.

### Erro: `git push` pede login

Entre com sua conta do GitHub.

Se abrir uma janela do navegador, faça login e autorize.

Se pedir usuário e senha no terminal, o GitHub pode exigir token em vez de senha. O jeito mais fácil é usar o login pela janela do navegador ou o GitHub Desktop.

### Erro: `git pull` deu conflito

Isso significa que o mesmo arquivo foi alterado em dois lugares.

Se acontecer, não apague nada no desespero.

Faça:

```bash
git status
```

Veja quais arquivos estão com conflito e resolva no VS Code. Depois:

```bash
git add .
git commit -m "Resolve conflitos"
git push
```

## 15. Rotina recomendada na escola

Use esta sequência toda vez:

```bash
cd "$env:USERPROFILE\Documents\aumiau-shop"
git pull
npm install
npm run dev
```

Abra:

```text
http://localhost:3000
```

Edite no VS Code.

Antes de enviar:

```bash
npm run check
git status
git add .
git commit -m "Descreva sua mudança"
git push
```

## 16. Resumo rápido

Primeira vez no notebook:

```bash
cd "$env:USERPROFILE\Documents"
git clone https://github.com/kauaneduardo-dev/aumiau-shop.git
cd aumiau-shop
npm install
npm run dev
```

Toda vez depois:

```bash
cd "$env:USERPROFILE\Documents\aumiau-shop"
git pull
npm install
npm run dev
```

Antes de enviar para o GitHub:

```bash
npm run check
git add .
git commit -m "Descreva sua mudança"
git push
```
