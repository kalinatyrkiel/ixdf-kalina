#!/usr/bin/env node
/**
 * Export HTML deck to PDF for IxDF backup.
 * 2× capture (2560×1440), multi-page reveal slides, no appendix.
 *
 * Usage: node scripts/export-deck-pdf.mjs
 * Requires: python3 -m http.server 8765 in repo root (or set DECK_URL).
 */

import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const outPdf = path.join(root, 'Masterclass-UX-Copy-AI-IxDF-backup.pdf');
const DECK_URL = process.env.DECK_URL || 'http://127.0.0.1:8765/index.html';

const SLIDE_W = 1280;
const SLIDE_H = 720;
const DEVICE_SCALE = 2;
/** PDF page size (pt): 16∶9, 2× the old 960×540 export */
const PAGE_W = 1920;
const PAGE_H = 1080;

async function waitForDeck(page) {
  await page.goto(DECK_URL, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deckExport?.slideCount?.() > 0, { timeout: 15000 });
}

async function captureStage(page) {
  await page.waitForTimeout(150);
  const coverSrc = await page.evaluate(() => {
    const img = document.querySelector('.slide.active.slide-ixdf-cover .ixdf-cover-img');
    return img ? img.getAttribute('src') : null;
  });
  if (coverSrc) {
    const filePath = path.join(root, coverSrc.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath);
    }
  }
  const stage = page.locator('#stage');
  return stage.screenshot({ type: 'png' });
}

async function collectFrames(page) {
  const frames = [];
  const count = await page.evaluate(() => window.__deckExport.slideCount());

  for (let i = 0; i < count; i += 1) {
    await page.evaluate((idx) => window.__deckExport.show(idx), i);
    const meta = await page.evaluate((idx) => window.__deckExport.slideAt(idx), i);

    frames.push({
      label: `${i + 1} — ${meta.title}`,
      png: await captureStage(page),
    });

    if (meta.compareReveal) {
      await page.evaluate(() => window.__deckExport.setCompareRevealed(true));
      frames.push({ label: `${i + 1} — ${meta.title} (after)`, png: await captureStage(page) });
    }

    if (meta.flowReveal) {
      await page.evaluate(() => window.__deckExport.setFlowStage(1));
      frames.push({ label: `${i + 1} — ${meta.title} (step 2)`, png: await captureStage(page) });
      await page.evaluate(() => window.__deckExport.setFlowStage(2));
      frames.push({ label: `${i + 1} — ${meta.title} (step 3)`, png: await captureStage(page) });
    }
  }

  return frames;
}

async function pngsToPdf(frames, outPath) {
  const pdf = await PDFDocument.create();
  for (const frame of frames) {
    const page = pdf.addPage([PAGE_W, PAGE_H]);
    const img = await pdf.embedPng(frame.png);
    page.drawImage(img, {
      x: 0,
      y: 0,
      width: PAGE_W,
      height: PAGE_H,
    });
  }
  fs.writeFileSync(outPath, await pdf.save());
}

async function main() {
  if (!fs.existsSync(htmlPath)) {
    console.error('index.html not found');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: SLIDE_W, height: SLIDE_H },
    deviceScaleFactor: DEVICE_SCALE,
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => console.warn('page error:', e.message));

  try {
    await waitForDeck(page);
  } catch {
    console.error(`Could not load deck at ${DECK_URL}. Start: python3 -m http.server 8765`);
    await browser.close();
    process.exit(1);
  }

  console.log(`Capturing slides at ${SLIDE_W * DEVICE_SCALE}×${SLIDE_H * DEVICE_SCALE}px…`);
  const frames = await collectFrames(page);
  console.log(`  ${frames.length} pages (includes reveal steps)`);

  console.log(`Writing PDF (${PAGE_W}×${PAGE_H} pt per page)…`);
  await pngsToPdf(frames, outPdf);
  await browser.close();
  console.log('Done:', outPdf);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
