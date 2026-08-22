import { useMemo, useState } from "react";

import { FormularioDespesa } from "@/components/despesas/FormularioDespesa";
import { ItemDespesa } from "@/components/despesas/ItemDespesa";
import {
  type Despesa,
  RENDA_INICIAL,
  despesasIniciais,
  formatarBRL,
} from "@/lib/despesas";

export function PainelSaldo() {
  const [renda, setRenda] = useState(RENDA_INICIAL);
  const [editandoRenda, setEditandoRenda] = useState(false);
  const [rascunhoRenda, setRascunhoRenda] = useState(String(RENDA_INICIAL));
  const [despesas, setDespesas] = useState<Despesa[]>(despesasIniciais);
  const [emEdicao, setEmEdicao] = useState<Despesa | null>(null);

  const totalGasto = useMemo(
    () => despesas.reduce((soma, d) => soma + d.valor, 0),
    [despesas],
  );
  const restante = renda - totalGasto;
  const consumido = renda > 0 ? Math.min(100, (totalGasto / renda) * 100) : 0;

  const salvar = (dados: { nome: string; valor: number; imagem: string | null }) => {
    if (emEdicao) {
      setDespesas((atual) =>
        atual.map((d) => (d.id === emEdicao.id ? { ...d, ...dados } : d)),
      );
      setEmEdicao(null);
      return;
    }
    setDespesas((atual) => [
      {
        id: crypto.randomUUID(),
        data: new Date().toISOString().slice(0, 10),
        ...dados,
      },
      ...atual,
    ]);
  };

  const salvarRenda = () => {
    const numero = Number(rascunhoRenda.replace(/\./g, "").replace(",", "."));
    if (Number.isFinite(numero) && numero >= 0) setRenda(numero);
    setEditandoRenda(false);
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground selection:bg-primary/20 md:p-12">
      <nav className="mx-auto mb-20 flex max-w-5xl items-baseline justify-between">
        <span className="font-display text-3xl italic tracking-tight">Saldo.</span>
        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>
            {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={() => {
              setRascunhoRenda(String(renda).replace(".", ","));
              setEditandoRenda((v) => !v);
            }}
            className="cursor-pointer transition-colors hover:text-primary"
          >
            Renda
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl">
        <section className="mb-24 animate-[var(--animate-slide-up)]">
          <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="space-y-2">
              {editandoRenda ? (
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Renda Mensal
                  </span>
                  <input
                    autoFocus
                    value={rascunhoRenda}
                    onChange={(e) => setRascunhoRenda(e.target.value)}
                    onBlur={salvarRenda}
                    onKeyDown={(e) => e.key === "Enter" && salvarRenda()}
                    className="w-32 border-b border-primary bg-transparent pb-1 font-mono text-sm focus:outline-none"
                  />
                </div>
              ) : (
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Renda Mensal: {formatarBRL(renda)}
                </p>
              )}

              <h1 className="font-display text-6xl italic leading-none md:text-8xl">
                {formatarBRL(restante)}
              </h1>
              <p className="text-sm text-muted-foreground">
                {restante >= 0
                  ? "restantes para o fim do mês"
                  : "acima da sua renda deste mês"}
              </p>
            </div>

            <div className="text-right">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Total Gasto
              </span>
              <p className="font-mono text-2xl">{formatarBRL(totalGasto)}</p>
            </div>
          </div>

          <div className="relative h-px w-full overflow-hidden bg-border">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${consumido}%` }}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <section className="space-y-12 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Registros Recentes
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {despesas.length} {despesas.length === 1 ? "item" : "itens"}
              </span>
            </div>

            {despesas.length === 0 ? (
              <div className="mx-auto flex max-w-sm flex-col items-center py-16 text-center opacity-40">
                <div className="mb-4 size-12 rounded-full border border-foreground/20" />
                <p className="font-mono text-xs uppercase tracking-widest">
                  Nenhum gasto registrado
                </p>
                <p className="mt-2 text-sm">
                  Sua renda deste mês está intacta. Registre o primeiro gasto ao lado.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {despesas.map((despesa) => (
                  <ItemDespesa
                    key={despesa.id}
                    despesa={despesa}
                    onEditar={() => setEmEdicao(despesa)}
                    onExcluir={() => {
                      setDespesas((atual) => atual.filter((d) => d.id !== despesa.id));
                      if (emEdicao?.id === despesa.id) setEmEdicao(null);
                    }}
                  />
                ))}
              </div>
            )}
          </section>

          <aside className="lg:col-span-5">
            <FormularioDespesa
              emEdicao={emEdicao}
              onSalvar={salvar}
              onCancelar={() => setEmEdicao(null)}
            />
          </aside>
        </div>
      </main>

      <footer className="mx-auto mt-40 flex max-w-5xl items-center justify-between pb-12 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Sistema de Gestão Pessoal</p>
        <p>São Paulo, BR</p>
      </footer>
    </div>
  );
}
