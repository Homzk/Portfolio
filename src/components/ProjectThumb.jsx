/* ---------------- ProjectThumb ----------------
   Miniatura de tarjeta de proyecto. Por defecto muestra el placeholder
   animado de la referencia. Si el proyecto está activado en VIDEO_READY
   (src/data/projects.js) y existe public/media/<slug>.webm, reproduce un
   <video> en bucle, silenciado, lazy (solo en viewport) y con poster.
   Respeta prefers-reduced-motion: en ese caso muestra el poster estático
   (o el placeholder), sin autoplay (Constitución II/V). El vídeo es
   decorativo (aria-hidden); el nombre accesible lo da el <Link> padre. */

import { useRef, useEffect, useState } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ProjectThumb({ slug, cap, hasVideo }) {
  const videoRef = useRef(null);
  const [reduced] = useState(prefersReducedMotion);
  const webm = `/media/${slug}.webm`;
  const poster = `/media/${slug}.jpg`;

  // Lazy: reproducir solo cuando la miniatura entra en el viewport.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <>
      {hasVideo ? (
        reduced ? (
          <img className="thumb-video" src={poster} alt="" />
        ) : (
          <video
            ref={videoRef}
            className="thumb-video"
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            aria-hidden="true"
          >
            <source src={webm} type="video/webm" />
          </video>
        )
      ) : (
        <>
          <div className="thumb-anim" />
          <div className="thumb-dots" />
        </>
      )}
      <div className="thumb-cap" aria-hidden="true">
        <span className="ti" />
        {cap}
      </div>
    </>
  );
}
