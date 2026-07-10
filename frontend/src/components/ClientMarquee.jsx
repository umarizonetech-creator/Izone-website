import { useAdmin } from "@/context/AdminContext";

export default function ClientMarquee() {
  const { clients = [] } = useAdmin() || {};
  const names = clients.map(c => c.name || c.companyName).filter(Boolean);

  const items = [...names, ...names, ...names];

  const Item = ({ name, i }) => (
    <span key={i} className="flex items-center gap-2 pr-12 whitespace-nowrap">
      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#6b7280]/50 dark:border-white/25 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af] dark:bg-white/35" />
      </span>
      <span className="text-[15px] font-semibold text-[#374151] dark:text-white/50 tracking-tight">
        {name}
      </span>
    </span>
  );

  return (
    <div className="mt-6 w-full min-w-0 max-w-full overflow-hidden" aria-hidden="true">
      <div className="mb-3 h-px w-full bg-[#15803d]/15 dark:bg-white/8" />
      <div
        className="relative flex min-w-0 max-w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div className="flex shrink-0 items-center" style={{ animation: "marquee-scroll 24s linear infinite" }}>
          {items.map((name, i) => <Item key={i} name={name} i={i} />)}
        </div>
        <div className="flex shrink-0 items-center" style={{ animation: "marquee-scroll 24s linear infinite" }} aria-hidden>
          {items.map((name, i) => <Item key={i} name={name} i={i} />)}
        </div>
      </div>
    </div>
  );
}
