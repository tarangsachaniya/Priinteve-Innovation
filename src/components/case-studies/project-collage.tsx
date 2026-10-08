import type { Project } from "@/content/types";
import { ProjectArt } from "./project-list";

const LAYOUT = [
  { cls: "left-0 top-6 w-[46%]", ratio: "aspect-[3/4]", arch: true },
  { cls: "right-0 top-0 w-[44%]", ratio: "aspect-[4/5]", arch: false },
  { cls: "right-[6%] bottom-0 w-[36%]", ratio: "aspect-square", arch: false },
];

/** A loose arrangement of project tiles for the Our Work hero. Decorative. */
export function ProjectCollage({ projects }: { projects: Project[] }) {
  return (
    <div aria-hidden="true" className="relative mx-auto hidden h-[32rem] w-full max-w-lg lg:block">
      {projects.slice(0, 3).map((p, i) => {
        const l = LAYOUT[i];
        return (
          <div key={p.slug} className={`absolute ${l.cls}`}>
            <ProjectArt project={p} className={`${l.ratio} w-full shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]`} />
          </div>
        );
      })}
    </div>
  );
}
