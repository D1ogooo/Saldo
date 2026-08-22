# Saldo — controle de despesas mensais

React 19 + TypeScript + Vite + Tailwind CSS v4 + react-router-dom. Sem TanStack.

## Rodar

```bash
npm install
npm run dev
```

## Estrutura

- `src/main.tsx` — BrowserRouter com a rota `/`
- `src/pages/Home.tsx` — página
- `src/components/despesas/PainelSaldo.tsx` — tela completa (estado da renda e dos gastos)
- `src/components/despesas/FormularioDespesa.tsx` — cadastro/edição com upload de imagem (base64)
- `src/components/despesas/ItemDespesa.tsx` — item da lista
- `src/lib/despesas.ts` — tipo `Despesa`, dados iniciais e formatadores (BRL / data)
- `src/index.css` — design system (tokens OKLCH + fontes)

## Plugar o backend

Troque `despesasIniciais` em `src/lib/despesas.ts` pela sua API e substitua os
`useState` de `PainelSaldo.tsx` por chamadas ao seu serviço (fetch/axios).
"# Saldo" 
