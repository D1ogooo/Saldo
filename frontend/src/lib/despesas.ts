import cafe from "../../assets/gasto-cafe.jpg";
import mercado from "../../assets/gasto-mercado.jpg";
import livros from "../../assets/gasto-livros.jpg";

export type Despesa = {
  id: string;
  nome: string;
  valor: number;
  imagem: string | null;
  data: string; 
};

export const RENDA_INICIAL = 2140;

export const despesasIniciais: Despesa[] = [
  {
    id: "1",
    nome: "Café Especial",
    valor: 18.5,
    imagem: cafe,
    data: "2026-08-12",
  },
  {
    id: "2",
    nome: "Supermercado Pão de Açúcar",
    valor: 342.9,
    imagem: mercado,
    data: "2026-08-10",
  },
  {
    id: "3",
    nome: "Livraria da Vila",
    valor: 89,
    imagem: livros,
    data: "2026-08-05",
  },
];

export const formatarBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatarData = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
