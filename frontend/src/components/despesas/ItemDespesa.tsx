import { type Despesa, formatarBRL, formatarData } from "@/lib/despesas";

export function ItemDespesa({
  despesa,
  onEditar,
  onExcluir,
}: {
  despesa: Despesa;
  onEditar: () => void;
  onExcluir: () => void;
}) {
  return (
    <div className="group flex items-center gap-6">
      <div className="size-20 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
        {despesa.imagem ? (
          <img
            src={despesa.imagem}
            alt={despesa.nome}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="grid h-full w-full place-items-center font-mono text-[9px] uppercase tracking-tight text-muted-foreground">
            Sem foto
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-lg font-medium tracking-tight">{despesa.nome}</h4>
        <p className="font-mono text-xs uppercase text-muted-foreground">
          {formatarData(despesa.data)}
        </p>
      </div>

      <div className="text-right">
        <p className="font-mono text-lg">- {formatarBRL(despesa.valor)}</p>
        <div className="mt-1 flex justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            onClick={onEditar}
            className="cursor-pointer font-mono text-[10px] uppercase tracking-tighter hover:text-primary"
          >
            Editar
          </button>
          <button
            onClick={onExcluir}
            className="cursor-pointer font-mono text-[10px] uppercase tracking-tighter hover:text-destructive"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
