/* ---------------- ProjectThumb ----------------
   Miniatura de tarjeta de proyecto. Si el proyecto tiene una imagen
   asignada (THUMB_IMG en src/data/projects.js) la muestra como <img>
   estática (lazy, object-fit:cover vía .thumb-video). Si no, cae al
   placeholder animado de la referencia. La imagen es decorativa
   (aria-hidden); el nombre accesible lo da el <Link> padre. */

export default function ProjectThumb({ img, cap }) {
  return (
    <>
      {img ? (
        <img className="thumb-video" src={img} alt="" loading="lazy" aria-hidden="true" />
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
