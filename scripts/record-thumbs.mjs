/* Graba miniaturas de los sitios en vivo con Playwright.
   Produce un .webm crudo por proyecto en .tmp-rec/<slug>.webm; luego se
   recorta/escala con ffmpeg a public/media/ (ver receta en quickstart.md).

   Playwright NO es dependencia del proyecto (se quitó para no inflar el
   build de Vercel). Para regrabar, instálalo puntualmente:
     npm i -D playwright && npx playwright install chromium
     node scripts/record-thumbs.mjs            (todos los del mapa)
     node scripts/record-thumbs.mjs airvision  (solo uno)
     npm uninstall playwright                  (al terminar)

   Solo cubre proyectos con URL pública; lpr/eventos requieren footage. */
import { chromium } from "playwright";
import { mkdirSync, readdirSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";

const SIZE = { width: 1280, height: 800 }; // 16:10, igual que .thumb
const OUT = ".tmp-rec";

const SITES = {
  maderas: {
    url: "https://maderasponotro.cl",
    // Recorrido: hero → bajar mostrando catálogo/cotización → volver arriba.
    tour: async (page) => {
      await scrollTour(page, [0, 600, 1200, 1800, 1200, 300]);
    },
  },
  airvision: {
    url: "https://air-vision-xi.vercel.app/",
    // El mapa es el protagonista: dejar que cargue y pasear el cursor.
    tour: async (page) => {
      await page.waitForTimeout(2500); // estaciones + tiles del mapa
      await mouseWander(page);
      await scrollTour(page, [0, 400, 0]);
      await mouseWander(page);
    },
  },
};

async function scrollTour(page, positions) {
  for (const y of positions) {
    await page.evaluate((to) => window.scrollTo({ top: to, behavior: "smooth" }), y);
    await page.waitForTimeout(1100);
  }
}

async function mouseWander(page) {
  const pts = [[300, 300], [800, 350], [950, 550], [500, 600], [650, 400]];
  for (const [x, y] of pts) {
    await page.mouse.move(x, y, { steps: 25 });
    await page.waitForTimeout(450);
  }
}

async function record(slug, site) {
  console.log(`▶ grabando ${slug} … ${site.url}`);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: SIZE,
    recordVideo: { dir: OUT, size: SIZE },
    deviceScaleFactor: 2, // nitidez
  });
  const page = await ctx.newPage();
  try {
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 45000 });
  } catch {
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 45000 });
  }
  await page.waitForTimeout(800);
  await site.tour(page);
  const video = page.video();
  await ctx.close(); // finaliza el .webm
  await browser.close();
  const src = await video.path();
  const dest = join(OUT, `${slug}.webm`);
  try { rmSync(dest); } catch {}
  renameSync(src, dest);
  console.log(`  ✓ ${dest}`);
}

const only = process.argv[2];
mkdirSync(OUT, { recursive: true });
for (const [slug, site] of Object.entries(SITES)) {
  if (only && only !== slug) continue;
  await record(slug, site);
}
// limpia .webm temporales con nombre aleatorio que Playwright deja
for (const f of readdirSync(OUT)) {
  if (!Object.keys(SITES).some((s) => f === `${s}.webm`)) {
    try { rmSync(join(OUT, f)); } catch {}
  }
}
console.log("listo.");
