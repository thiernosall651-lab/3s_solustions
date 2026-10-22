export type ProjectLogoData = {
  logoUrl: string | null;
  wordmark: string;
  submark: string;
  kind: "k2b" | "teranga" | "gardens" | "sen";
};

const brandStyles: Record<ProjectLogoData["kind"], { wordmark: string; submark: string }> = {
  k2b: { wordmark: "text-white", submark: "text-cyan-300" },
  teranga: { wordmark: "text-amber-200", submark: "text-amber-300" },
  gardens: { wordmark: "text-emerald-200", submark: "text-emerald-300" },
  sen: { wordmark: "text-white", submark: "text-yellow-300" },
};

export function ProjectLogo({ project }: { project: ProjectLogoData }) {
  const style = brandStyles[project.kind];
  return (
    <div className="flex h-24 flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-2 text-center sm:h-28">
      {project.logoUrl && (
        <div className="flex h-8 max-w-[78%] items-center justify-center rounded bg-white px-2 py-0.5">
          <img
            src={project.logoUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="max-h-7 max-w-full object-contain"
            onError={(event) => { event.currentTarget.parentElement?.remove(); }}
          />
        </div>
      )}
      <span className={`font-display text-lg font-extrabold leading-none tracking-wide sm:text-xl ${style.wordmark}`}>
        {project.wordmark}
      </span>
      <span className={`text-[10px] font-bold tracking-[0.24em] ${style.submark}`}>
        {project.submark}
      </span>
    </div>
  );
}
