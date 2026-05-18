import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../src/assets/gallery/google')
const mapsUrl =
  'https://www.google.com/maps/place/ZBX+INSTALLATIONS/@44.7218538,25.322368,17z/data=!3m1!4b1!4m6!3m5!1s0x40b289bd41fb2e1b:0x3353ceaa4f5994b7!8m2!3d44.7218538!4d25.322368!16s%2Fg%2F11z736whnp'

fs.mkdirSync(outDir, { recursive: true })

function normalizePhotoUrl(url) {
  if (!url.includes('googleusercontent')) return null
  const [base] = url.split('=')
  return `${base}=w1600-h1200-k-no`
}

const imageUrls = new Set()

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  locale: 'ro-RO',
  viewport: { width: 1400, height: 900 },
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
})
await context.addCookies([
  {
    name: 'CONSENT',
    value: 'YES+cb.20210419-17-p0.en+FX+667',
    domain: '.google.com',
    path: '/',
  },
  {
    name: 'SOCS',
    value: 'CAESEwgDEgk0ODE3Nzk3Mg',
    domain: '.google.com',
    path: '/',
  },
])
const page = await context.newPage()

page.on('response', (response) => {
  const url = response.url()
  if (
    url.includes('googleusercontent.com') &&
    (response.request().resourceType() === 'image' || url.includes('/gps-cs-s/'))
  ) {
    const normalized = normalizePhotoUrl(url)
    if (normalized) imageUrls.add(normalized)
  }
})

await page.goto(mapsUrl, { waitUntil: 'domcontentloaded', timeout: 45000 })
await page.waitForTimeout(2500)

if (page.url().includes('consent.google')) {
  const continueUrl = new URL(page.url()).searchParams.get('continue')
  await page
    .locator('#L2AGLb, button[aria-label*="Accept"], button:has-text("Accept all"), button:has-text("Accepta tot")')
    .first()
    .click({ timeout: 10000 })
    .catch(() => {})
  await page.waitForTimeout(4000)
  if (continueUrl && page.url().includes('consent.google')) {
    await page.goto(decodeURIComponent(continueUrl), {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    })
    await page.waitForTimeout(4000)
  }
}

// Click main photo / photos count
const selectors = [
  'button[jsaction*="heroHeaderImage"]',
  'button[aria-label*="foto"]',
  'button[aria-label*="Photo"]',
  'a[href*="/photos"]',
  'img[src*="googleusercontent"]',
]
for (const sel of selectors) {
  const el = page.locator(sel).first()
  if (await el.count()) {
    await el.click({ timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(2000)
    break
  }
}

const allPhotos = page.getByRole('button', { name: /toate fotografiile|all photos|vezi toate/i })
if (await allPhotos.count()) {
  await allPhotos.first().click({ timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(3000)
}

for (let i = 0; i < 20; i++) {
  await page.keyboard.press('ArrowRight').catch(() => {})
  await page.mouse.wheel(0, 700)
  await page.waitForTimeout(500)
}

// Collect from DOM as fallback
const domUrls = await page.$$eval('img[src*="googleusercontent"]', (nodes) =>
  nodes.map((n) => n.src).filter(Boolean),
)
for (const src of domUrls) {
  const normalized = normalizePhotoUrl(src)
  if (normalized) imageUrls.add(normalized)
}

const reviews = []
const reviewBlocks = await page.locator('div.jftiEf').all()
for (const block of reviewBlocks.slice(0, 12)) {
  const author = (await block.locator('.d4r55').first().textContent().catch(() => '')) || ''
  const text = (await block.locator('.wiI7pd').first().textContent().catch(() => '')) || ''
  const aria = await block
    .locator('[aria-label*="stea"], [aria-label*="star"]')
    .first()
    .getAttribute('aria-label')
    .catch(() => '')
  const ratingMatch = aria?.match(/(\d)/)
  if (text.trim()) {
    reviews.push({ author: author.trim(), text: text.trim(), rating: ratingMatch ? Number(ratingMatch[1]) : 5 })
  }
}

const ratingText = await page.locator('.F7nice').first().textContent().catch(() => null)

const downloaded = []
let index = 0
for (const url of [...imageUrls].slice(0, 15)) {
  try {
    const res = await context.request.get(url)
    if (!res.ok()) continue
    const buf = await res.body()
    if (buf.length < 50000) continue
    if (url.includes('/a/ACg8oc')) continue
    const file = path.join(outDir, `photo-${String(index + 1).padStart(2, '0')}.jpg`)
    fs.writeFileSync(file, buf)
    downloaded.push(path.basename(file))
    index += 1
  } catch {
    /* skip */
  }
}

const result = {
  pageUrl: page.url(),
  ratingText: ratingText?.trim(),
  reviews,
  imageUrls: [...imageUrls],
  downloaded,
}

fs.writeFileSync(path.join(__dirname, 'maps-scrape-result.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
await browser.close()
