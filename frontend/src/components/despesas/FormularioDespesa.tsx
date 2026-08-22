import { useEffect, useRef, useState } from "react";
import type { Despesa } from "@/lib/despesas";

type Rascunho = { nome: string; valor: number; imagem: string | null };

export function FormularioDespesa({
  emEdicao,
  onSalvar,
  onCancelar,
}: {
  emEdicao: Despesa | null;
  onSalvar: (dados: Rascunho) => void;
  onCancelar: () => void;
}) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const inputArquivo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNome(emEdicao?.nome ?? "");
    setValor(emEdicao ? String(emEdicao.valor).replace(".", ",") : "");
    setImagem(emEdicao?.imagem ?? null);
  }, [emEdicao]);

  const escolherArquivo = (arquivo: File | undefined) => {
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = () => setImagem(String(leitor.result));
    leitor.readAsDataURL(arquivo);
  };

  const enviar = (evento: React.FormEvent) => {
    evento.preventDefault();
    const numero = Number(valor.replace(/\./g, "").replace(",", "."));
    if (!nome.trim() || !Number.isFinite(numero) || numero <= 0) return;
    onSalvar({ nome: nome.trim(), valor: numero, imagem });
    if (!emEdicao) {
      setNome("");
      setValor("");
      setImagem(null);
    }
  };

  return (
    <div className="sticky top-12 rounded-sm bg-surface p-8 ring-1 ring-border">
      <h3 className="mb-8 font-display text-2xl italic">
        {emEdicao ? "Editar Gasto" : "Novo Gasto"}
      </h3>

      <form onSubmit={enviar} className="space-y-6">
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Imagem do Produto
          </label>
          <button
            type="button"
            onClick={() => inputArquivo.current?.click()}
            className="grid aspect-video w-full cursor-pointer place-items-center overflow-hidden rounded-sm border border-dashed border-border bg-background transition-colors hover:bg-card"
          >
            {imagem ? (
              <img
                src={imagem}
                alt="Pré-visualização do produto"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Upload Foto
              </span>
            )}
          </button>
          <input
            ref={inputArquivo}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => escolherArquivo(e.target.files?.[0])}
          />
          {imagem && (
            <button
              type="button"
              onClick={() => setImagem(null)}
              className="cursor-pointer font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-destructive"
            >
              Remover imagem
            </button>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="nome"
            className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            Nome do Produto
          </label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Almoço Executivo"
            className="w-full border-b border-border bg-transparent pb-2 font-medium transition-colors focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="valor"
            className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            Valor (R$)
          </label>
          <input
            id="valor"
            inputMode="decimal"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0,00"
            className="w-full border-b border-border bg-transparent pb-2 font-mono text-xl transition-colors focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="w-full cursor-pointer bg-foreground py-4 font-mono text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary"
          >
            {emEdicao ? "Salvar alterações" : "Registrar Gasto"}
          </button>
          {emEdicao && (
            <button
              type="button"
              onClick={onCancelar}
              className="cursor-pointer border border-border px-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
