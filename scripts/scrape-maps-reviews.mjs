import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const mapsUrl =
  'https://www.google.com/maps/place/ZBX+INSTALLATIONS/@44.7218538,25.322368,17z/data=!3m1!4b1!4m6!3m5!1s0x40b289bd41fb2e1b:0x3353ceaa4f5994b7!8m2!3d44.7218538!4d25.322368!16s%2Fg%2F11z736whnp'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ locale: 'ro-RO', viewport: { width: 1400, height: 900 } })
await context.addCookies([
  { name: 'CONSENT', value: 'YES+cb.20210419-17-p0.en+FX+667', domain: '.google.com', path: '/' },
])
const page = await context.newPage()

await page.goto(mapsUrl, { waitUntil: 'domcontentloaded', timeout: 45000 })
await page.waitForTimeout(4000)

// Click reviews count / stars in side panel
const openReviews = [
  page.getByRole('button', { name: /recenz|review|\(9\)|5,0|5\.0/i }),
  page.locator('button.hh2c6'),
  page.locator('.F7nice'),
]
for (const loc of openReviews) {
  if (await loc.count()) {
    await loc.first().click({ timeout: 6000 }).catch(() => {})
    await page.waitForTimeout(2500)
    break
  }
}

const panel = page.locator('div[role="feed"]').first()
for (let i = 0; i < 10; i++) {
  await panel.evaluate((el) => el.scrollBy(0, 1000)).catch(() => {})
  await page.waitForTimeout(400)
}

const reviews = await page.evaluate(() => {
  const blocks = document.querySelectorAll('div.jftiEf')
  const out = []
  blocks.forEach((block) => {
    const author = block.querySelector('.d4r55')?.textContent?.trim() || ''
    const text = block.querySelector('.wiI7pd')?.textContent?.trim() || ''
    const date = block.querySelector('.rsqaWe')?.textContent?.trim() || ''
    const aria = block.querySelector('[aria-label*="stea"], [aria-label*="star"]')?.getAttribute('aria-label') || ''
    const m = aria.match(/(\d)/)
    if (text) out.push({ author, text, date, rating: m ? Number(m[1]) : 5 })
  })
  return out
})

const summary = await page.evaluate(() => {
  const el = document.querySelector('.F7nice')
  return el?.textContent || ''
})

const ratingMatch = summary.match(/([\d,]+)/)
const countMatch = summary.match(/\((\d+)\)/)

const result = {
  rating: ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : 5,
  reviewCount: countMatch ? Number(countMatch[1]) : reviews.length || 9,
  reviews,
}

fs.writeFileSync(path.join(__dirname, 'maps-reviews.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
await browser.close()
