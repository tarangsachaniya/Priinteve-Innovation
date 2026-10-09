import type { CSSProperties } from "react";
import { site } from "@/content/site";

const DEPTH = 14; // extrusion layers
const MARK: CSSProperties = {
  WebkitMaskImage: "url(/logo-mark.webp)",
  maskImage: "url(/logo-mark.webp)",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

/**
 * Hero visual: the Priinteve bird mark as a solid 3D object built from stacked CSS layers (no WebGL).
 * It tilts toward the pointer (reads --px/--py from a PointerParallax parent), floats slowly, and sits
 * inside thin orbit rings on a deep green stage. Static and flat for reduced-motion users.
 */
export function LogoStage() {
  return (
    <div aria-hidden="true" data-tone="dark" className="grain relative isolate mx-auto aspect-square w-full overflow-hidden rounded-[2rem] border border-line bg-[radial-gradient(70%_60%_at_50%_42%,#24451a_0%,#131c17_55%,#0b100c_100%)] lg:max-w-[30rem]">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      {/* orbit rings */}
      <div className="absolute inset-0 grid place-items-center">
        <span className="eco-ring absolute size-[86%] rounded-full border border-dashed border-white/10" />
        <span className="absolute size-[66%] rounded-full border border-white/[0.07]" />
        <span className="eco-ring absolute size-[46%] rounded-full border border-[#9dbd6a]/20 [animation-direction:reverse] [animation-duration:40s]">
          <i className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-[#9dbd6a] shadow-[0_0_14px_3px_rgb(157_189_106/0.7)]" />
        </span>
        <span className="eco-ring absolute size-[86%] rounded-full [animation-duration:70s]">
          <i className="absolute bottom-[14%] right-[6%] size-1.5 rounded-full bg-[#eed89e] shadow-[0_0_12px_3px_rgb(238_216_158/0.6)]" />
        </span>
      </div>
      {/* shadow and glow under the mark: gradients, not filter: blur(), so iOS Safari renders them cleanly */}
      <span className="absolute left-1/2 top-[58%] h-[22%] w-[60%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(0_0_0/0.5),transparent)]" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(29_201_79/0.18)_0%,rgb(29_201_79/0.06)_22%,transparent_40%)]" />

      {/* the mark */}
      <div className="absolute inset-0 grid place-items-center [perspective:1100px]">
        <div className="w-[58%] motion-safe:[animation:float-y_7s_ease-in-out_infinite]">
          <div
            className="relative aspect-[547/373] transition-transform duration-700 ease-out-expo [transform-style:preserve-3d]"
            style={{ transform: "rotateX(calc(12deg + var(--py, 0) * -14deg)) rotateY(calc(-22deg + var(--px, 0) * 22deg))" }}
          >
            {Array.from({ length: DEPTH }, (_, i) => (
              <span
                key={i}
                className="absolute inset-0"
                style={{
                  ...MARK,
                  transform: `translateZ(${-(i + 1) * 1.6}px)`,
                  background: `linear-gradient(160deg, hsl(140 60% ${26 - i * 0.9}%), hsl(150 70% ${14 - i * 0.5}%))`,
                }}
              />
            ))}
            {/* face */}
            <span className="absolute inset-0" style={{ ...MARK, background: "linear-gradient(150deg, #6ff08f 0%, #1dc94f 38%, #12a33c 72%, #0d7a2d 100%)" }} />
            {/* moving sheen across the face */}
            <span className="absolute inset-0 overflow-hidden" style={MARK}>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-safe:[animation:sweep_5.5s_ease-in-out_infinite]" />
            </span>
          </div>
        </div>
      </div>

      <div className="label absolute inset-x-0 bottom-5 flex justify-between px-6 text-[0.6rem] text-white/45">
        <span>Priinteve</span>
        <span>Since {site.founded} · {site.location.city}</span>
      </div>
    </div>
  );
}
