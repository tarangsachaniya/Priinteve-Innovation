import { CalendarDays, CheckCircle2, FileText, Nfc, Package, QrCode, Truck, UserRound, UtensilsCrossed } from "lucide-react";
import type { ReactNode } from "react";
import type { Product, ProductSlug } from "@/content/types";
import { cn } from "@/lib/utils";

/*
 * Illustrative product interfaces, drawn in CSS so they stay crisp and cost no WebGL.
 * Every label comes from the product's own content (`mock`, features) or from the flow it describes;
 * nothing here claims a metric. All status chips are violet tints so the palette stays one brand.
 */

/** Browser-style window chrome shared by every mockup. */
function Window({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-[#131c17]/90 text-[#faf8f2] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85)] backdrop-blur", className)}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <i className="size-2 rounded-full bg-white/25" />
        <i className="size-2 rounded-full bg-white/15" />
        <i className="size-2 rounded-full bg-white/15" />
        <span className="ml-3 truncate text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/55">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

const CHIP = {
  strong: "bg-[#6b8e3d] text-white",
  soft: "bg-[#9dbd6a]/20 text-[#dcebc0]",
  quiet: "bg-white/10 text-white/70",
};
const chipFor = (state: string) => (/^(printing|new|cooking|booked|step 2|tap)$/i.test(state) ? CHIP.strong : /^(ready|step 3|nfc)$/i.test(state) ? CHIP.soft : CHIP.quiet);

function Chip({ children, tone }: { children: ReactNode; tone: keyof typeof CHIP }) {
  return <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em]", CHIP[tone])}>{children}</span>;
}

function Row({ label, state, lead }: { label: string; state: string; lead?: ReactNode }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.06] px-3 py-2.5 text-[0.78rem]">
      <span className="flex min-w-0 items-center gap-2.5">
        {lead}
        <span className="truncate">{label}</span>
      </span>
      <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em]", chipFor(state))}>{state}</span>
    </li>
  );
}

/** A fake QR: a deterministic grid of cells with the three finder squares. */
function Qr({ className }: { className?: string }) {
  const cells = Array.from({ length: 49 }, (_, i) => {
    const x = i % 7, y = Math.floor(i / 7);
    const finder = (x < 3 && y < 3) || (x > 3 && y < 3) || (x < 3 && y > 3);
    return finder || (x * 5 + y * 3 + x * y) % 3 === 0;
  });
  return (
    <div aria-hidden="true" className={cn("grid aspect-square grid-cols-7 gap-[3px] rounded-lg bg-white p-2", className)}>
      {cells.map((on, i) => (
        <i key={i} className={cn("rounded-[1.5px]", on ? "bg-[#131c17]" : "bg-transparent")} />
      ))}
    </div>
  );
}

function Ping({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute grid place-items-center", className)}>
      {[0, 1].map((i) => (
        <i key={i} className="absolute size-full rounded-full border border-[#9dbd6a]/60" style={{ animation: `pulse-ring 2.6s ease-out ${i * 1.3}s infinite` }} />
      ))}
    </span>
  );
}

function XeroxBuddy({ p }: { p: Product }) {
  return (
    <div className="relative grid gap-3 sm:grid-cols-[0.7fr_1.3fr] sm:items-end">
      <Window title="Scan" className="sm:mb-6">
        <div className="relative mx-auto w-24">
          <Qr />
          <Ping className="-inset-3" />
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-2 text-[0.72rem] text-white/70">
          <FileText className="size-3.5 text-[#9dbd6a]" aria-hidden="true" />
          PDF · Image · Word
        </div>
      </Window>
      <Window title={p.mock.title}>
        <ul className="space-y-1.5">
          {p.mock.rows.map(([l, s]) => (
            <Row key={l} label={l} state={s} lead={<FileText className="size-3.5 shrink-0 text-[#9dbd6a]" aria-hidden="true" />} />
          ))}
        </ul>
        <div className="mt-3 flex gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em]">
          <span className="rounded-full bg-[#6b8e3d] px-3 py-1 text-white">Customer prints</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-white/60">You print</span>
        </div>
        <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <span className="absolute inset-y-0 w-1/3 rounded-full bg-[#9dbd6a]" style={{ animation: "sweep 2.2s ease-in-out infinite" }} />
        </div>
      </Window>
    </div>
  );
}

function VentaDot({ p }: { p: Product }) {
  const cols = [
    { h: "New", items: ["Table 4"] },
    { h: "Cooking", items: ["Takeaway #18"] },
    { h: "Ready", items: ["Table 7"] },
  ];
  return (
    <div className="relative grid gap-3 sm:grid-cols-[1.25fr_0.75fr] sm:items-start">
      <Window title={p.mock.title}>
        <div className="grid grid-cols-3 gap-2">
          {cols.map((c, ci) => (
            <div key={c.h} className="rounded-xl bg-white/[0.05] p-2">
              <p className="mb-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/55">{c.h}</p>
              {c.items.map((it) => (
                <div key={it} className={cn("rounded-lg px-2 py-2 text-[0.7rem] leading-tight", ci === 0 ? "bg-[#6b8e3d] text-white" : ci === 1 ? "bg-[#9dbd6a]/25 text-[#e6f0d0]" : "bg-white/10 text-white/75")}>
                  {it}
                </div>
              ))}
              <div className="mt-1.5 h-6 rounded-lg border border-dashed border-white/10" />
            </div>
          ))}
        </div>
        <ul className="mt-3 space-y-1.5">
          {p.mock.rows.slice(0, 2).map(([l, s]) => (
            <Row key={l} label={l} state={s} lead={<UtensilsCrossed className="size-3.5 shrink-0 text-[#9dbd6a]" aria-hidden="true" />} />
          ))}
        </ul>
      </Window>
      <Window title="Table standee" className="sm:mt-8">
        <div className="relative mx-auto w-20">
          <Qr />
          <Ping className="-inset-3" />
        </div>
        <p className="mt-4 text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/60">Scan or tap · Order</p>
        <div className="mt-2 flex items-center justify-center gap-2 text-[0.7rem] text-[#dcebc0]">
          <Nfc className="size-3.5" aria-hidden="true" /> Table 4
        </div>
      </Window>
    </div>
  );
}

function Salonly({ p }: { p: Product }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const booked = new Set([1, 4, 7, 9, 12]);
  return (
    <div className="relative">
      <Window title={p.mock.title}>
        <div className="mb-3 flex items-center gap-2 text-[0.7rem] text-white/60">
          <CalendarDays className="size-3.5 text-[#9dbd6a]" aria-hidden="true" /> Appointments
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d) => (
            <span key={d} className="pb-1 text-center text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-white/45">
              {d}
            </span>
          ))}
          {Array.from({ length: 15 }, (_, i) => (
            <i key={i} className={cn("h-6 rounded-md", booked.has(i) ? "bg-[#6b8e3d] shadow-[0_0_14px_-2px_rgb(107_142_61/0.9)]" : "bg-white/[0.07]")} style={booked.has(i) ? { animation: `float-y ${3 + (i % 3)}s ease-in-out infinite` } : undefined} />
          ))}
        </div>
        <ul className="mt-3 space-y-1.5">
          {p.mock.rows.map(([l, s]) => (
            <Row key={l} label={l} state={s} />
          ))}
        </ul>
      </Window>
    </div>
  );
}

function Nectcard({ p }: { p: Product }) {
  return (
    <div className="relative grid gap-3 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
      <div className="relative mx-auto w-full max-w-[17rem] [perspective:900px]">
        <div className="relative aspect-[1.6] rounded-2xl border border-white/15 bg-[linear-gradient(135deg,#2c4a18,#0d120d_70%)] p-4 text-white shadow-[0_40px_80px_-24px_rgb(107_142_61/0.7)] [transform:rotateY(-14deg)_rotateX(6deg)]" style={{ animation: "float-y 5s ease-in-out infinite" }}>
          <Nfc className="absolute right-4 top-4 size-6 text-[#d4e4b0]" aria-hidden="true" />
          <span className="grid size-9 place-items-center rounded-full bg-[#6b8e3d]">
            <UserRound className="size-4" aria-hidden="true" />
          </span>
          <p className="absolute bottom-4 left-4 text-sm font-semibold leading-tight">
            Your name
            <span className="block text-[0.68rem] font-normal text-white/60">Role · Company</span>
          </p>
        </div>
        <Ping className="-right-3 -top-3 size-14" />
      </div>
      <Window title={p.mock.title}>
        <ul className="space-y-1.5">
          {p.mock.rows.map(([l, s]) => (
            <Row key={l} label={l} state={s} />
          ))}
        </ul>
        <div className="mt-3 rounded-full bg-[#6b8e3d] py-2 text-center text-[0.7rem] font-semibold text-white">Save to contacts</div>
      </Window>
    </div>
  );
}

function Printing({ p }: { p: Product }) {
  const icons = [FileText, Package, Truck];
  return (
    <div className="relative">
      <Window title={p.mock.title}>
        <ol className="relative space-y-2">
          <span aria-hidden="true" className="absolute bottom-6 left-[1.05rem] top-6 w-px bg-white/15" />
          {p.mock.rows.map(([l, s], i) => {
            const I = icons[i] ?? CheckCircle2;
            return (
              <li key={l} className="relative flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-2.5 text-[0.78rem]">
                <span className={cn("relative z-10 grid size-6 shrink-0 place-items-center rounded-full", i === 1 ? "bg-[#6b8e3d] text-white" : "bg-white/12 text-[#dcebc0]")}>
                  <I className="size-3" aria-hidden="true" />
                </span>
                <span className="flex-1 truncate">{l}</span>
                <Chip tone={i === 1 ? "strong" : "soft"}>{s}</Chip>
              </li>
            );
          })}
        </ol>
        <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <span className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-[#9dbd6a]" />
        </div>
      </Window>
    </div>
  );
}

const MOCKUPS: Record<ProductSlug, (props: { p: Product }) => ReactNode> = {
  "xerox-buddy": XeroxBuddy,
  ventadot: VentaDot,
  salonly: Salonly,
  nectcard: Nectcard,
  "priinteve-printing": Printing,
};

/** The product's own illustrative interface. Decorative, hidden from assistive tech. */
export function ProductMockup({ product, className }: { product: Product; className?: string }) {
  const Cmp = MOCKUPS[product.slug];
  return (
    <div aria-hidden="true" className={className}>
      <Cmp p={product} />
    </div>
  );
}
