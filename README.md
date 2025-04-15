# Projeto Next.js - Fortnite Stats

Este é um projeto desenvolvido com [Next.js](https://nextjs.org) que utiliza a API do Fortnite para exibir estatísticas e novidades do jogo. O projeto também utiliza Tailwind CSS para estilização e outras bibliotecas modernas para melhorar a experiência do usuário.

## 🚀 Como executar o projeto

### 1. Clonar o repositório
Para começar, você precisa clonar este repositório em sua máquina local. Execute o seguinte comando no terminal:

```bash
git clone https://github.com/jpprestes1/projetonext.git
```

### 2. Acessar o diretório do projeto
Entre no diretório do projeto clonado:

```bash
cd projetonext
```

### 3. Instalar as dependências
Instale as dependências necessárias utilizando o gerenciador de pacotes de sua preferência:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 4. Iniciar o servidor de desenvolvimento
Após instalar as dependências, inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ou caso prefira, inicie o servidor no modo de produção:

```bash
npm run start
# ou
yarn start
# ou
pnpm start
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto.

---

## 📂 Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
projetonext/
├── src/
│   ├── app/
│   │   ├── api/          # Rotas da API (ex.: autenticação, estatísticas, favoritos)
│   │   ├── login/        # Página de login
│   │   ├── news/         # Página de novidades do Fortnite
│   │   ├── stats/        # Página de estatísticas do jogador
│   │   ├── globals.css   # Estilos globais do projeto
│   │   ├── layout.js     # Layout principal do projeto
│   │   └── page.js       # Página inicial
│   ├── components/       # Componentes reutilizáveis (ex.: botões, menus)
│   ├── lib/              # Funções utilitárias (ex.: `cn` para classes CSS)
│   └── middleware.js     # Middleware para proteger rotas
├── public/               # Arquivos públicos (imagens, ícones, etc.)
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Dependências e scripts do projeto
├── next.config.mjs       # Configurações do Next.js
└── README.md             # Documentação do projeto
```

---

## ✨ Funcionalidades Principais

1. **Login e Autenticação**:
   - Página de login com autenticação básica.
   - Middleware para proteger rotas específicas.

2. **Estatísticas do Fortnite**:
   - Busca estatísticas de jogadores utilizando a API do Fortnite.
   - Comparação de estatísticas entre jogadores.
   - Favoritar jogadores para acesso rápido.

3. **Novidades do Fortnite**:
   - Exibe as últimas novidades do jogo, incluindo imagens e descrições.

4. **Favoritos**:
   - Salva até 5 jogadores favoritos no armazenamento local do navegador.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para renderização no lado do servidor e geração de páginas estáticas.
- **React**: Biblioteca para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Radix UI**: Componentes acessíveis e estilizados.
- **Fortnite API**: API para buscar estatísticas e novidades do jogo.
- **LocalStorage**: Armazenamento local para salvar favoritos.
- **Middleware do Next.js**: Proteção de rotas com redirecionamento para login.

---

## 📖 Como o projeto está organizado

- **Páginas**:
  - `/`: Página inicial com informações sobre o projeto.
  - `/login`: Página de login para autenticação.
  - `/news`: Página que exibe as últimas novidades do Fortnite.
  - `/stats`: Página que exibe estatísticas de jogadores e permite comparação.

- **API**:
  - `/api/auth`: Rota para autenticação de usuários.
  - `/api/stats`: Rota para buscar estatísticas de jogadores.
  - `/api/logout`: Rota para realizar logout.

- **Componentes**:
  - Componentes reutilizáveis como botões (`button.jsx`) e menus dropdown (`dropdown-menu.jsx`).

---

## 📝 Observações

- Certifique-se de configurar a variável de ambiente `FORTNITE_API_KEY` com sua chave de API do Fortnite.
- O projeto utiliza o armazenamento local do navegador para salvar favoritos. Certifique-se de que o navegador permite o uso de `localStorage`.

---

## 📚 Documentação da API utilizada

- [API do Fortnite](https://fortnite-api.com/)
