import type { PracticePack } from "@syntaxgym/content";
import { ui } from "../../lib/ui";

type Props = {
  pack: PracticePack;
  onSelect: (pack: PracticePack) => void;
};

export function PracticePackCard({ pack, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(pack)}
      className="group rounded-lg border border-lavender-mist bg-paper p-16 text-left transition-colors flex flex-col h-full hover:bg-lavender-mist hover:border-sst-ink"
    >
      <div className="flex justify-between items-start mb-8 w-full">
        <h3 className="text-body font-semibold text-sst-ink">
          {pack.title}
        </h3>
        <span className="rounded-md bg-lavender-mist px-6 py-2 text-[10px] font-semibold text-slate uppercase tracking-wide shrink-0 ml-8 group-hover:bg-paper">
          {pack.level}
        </span>
      </div>
      
      <p className={ui.body + " mb-16 line-clamp-2"}>
        {pack.description}
      </p>
      
      <div className="flex flex-wrap gap-4 mt-auto w-full">
        {pack.focusTokens.slice(0, 4).map((token) => (
          <code key={token} className="rounded-md bg-code-rust/10 px-6 py-2 font-ibm-plex-mono text-[11px] font-medium text-code-rust">
            {token}
          </code>
        ))}
        {pack.focusTokens.length > 4 && (
          <code className="rounded-md bg-lavender-mist px-6 py-2 font-ibm-plex-mono text-[11px] font-medium text-fog group-hover:bg-paper">
            +{pack.focusTokens.length - 4}
          </code>
        )}
      </div>

      <div className="mt-16 flex items-center justify-between w-full pt-16 border-t border-lavender-mist group-hover:border-slate/20">
        <span className="text-caption text-fog font-medium">
          {pack.snippetIds.length} snippet{pack.snippetIds.length !== 1 ? "s" : ""}
        </span>
        <span className="text-caption font-semibold text-sst-ink opacity-0 transition-opacity group-hover:opacity-100">
          View pack &rarr;
        </span>
      </div>
    </button>
  );
}
