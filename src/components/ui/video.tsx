"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/**
 * Click-to-play YouTube embed. Shows a locally stored thumbnail and loads nothing from YouTube until the
 * visitor presses play; then embeds from youtube-nocookie.com (privacy-enhanced mode).
 */
export function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-line bg-[#0d120d] shadow-[0_40px_90px_-40px_rgb(0_0_0/0.6)]">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 grid place-items-center" aria-label={`Play video: ${title}`}>
          <Image src={`/media/video/${id}.webp`} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span className="relative grid size-18 place-items-center rounded-full bg-[#6b8e3d] text-white shadow-[0_0_50px_-6px_rgb(107_142_61/0.9)] transition-transform duration-500 group-hover:scale-110">
            <Play aria-hidden="true" className="ml-1 size-7" fill="currentColor" />
          </span>
          <span className="absolute bottom-5 left-5 right-5 text-left text-sm font-semibold text-white">{title} · plays from YouTube</span>
        </button>
      )}
    </div>
  );
}
