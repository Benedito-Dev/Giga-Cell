# Giga Cell - Deploy no Vercel

## Estrutura do Projeto
- `BackEnd/` - API Node.js/Express
- `FrontEnd/` - Aplicação React com Vite

## Deploy no Vercel

### Backend (API)
1. Faça deploy da pasta `BackEnd` como um novo projeto no Vercel
2. Configure as variáveis de ambiente no painel do Vercel:
   - `DATABASE_URL`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
3. O domínio será algo como: `https://giga-cell-api.vercel.app`

### Frontend
1. Faça deploy da pasta `FrontEnd` como um novo projeto no Vercel
2. Configure a variável de ambiente:
   - `VITE_API_URL=https://giga-cell-api.vercel.app` (use o domínio real da sua API)
3. O domínio será algo como: `https://giga-cell-front.vercel.app`

## Configurações Importantes

### Backend
- O arquivo `api/index.js` é o ponto de entrada para o Vercel
- CORS configurado para aceitar requisições do frontend
- Todas as rotas são tratadas como serverless functions

### Frontend
- Configurado para fazer build otimizado
- Variáveis de ambiente configuradas para produção
- Roteamento configurado para SPA

## URLs de Exemplo
- API: `https://giga-cell-api.vercel.app`
- Frontend: `https://giga-cell-front.vercel.app`

## Testando Localmente
```bash
# Backend
cd BackEnd
npm install
npm run dev

# Frontend
cd FrontEnd
npm install
npm run dev
```