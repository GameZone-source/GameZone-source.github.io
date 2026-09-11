import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'

const stage = process.argv[2]

if (!['before', 'after'].includes(stage) || process.argv.length !== 3) {
  console.error('Uso: node scripts/accessibility/capture-audit.mjs <before|after>')
  process.exit(1)
}

const baseURL = 'http://127.0.0.1:3000'
const routes = [
  ['inicio', '/'],
  ['reviews', '/reviews/'],
  ['review-elden-ring', '/reviews/elden-ring/'],
  ['descoberta', '/descoberta/'],
  ['sobre', '/sobre/'],
  ['contato', '/contato/'],
  ['impacto', '/impacto/']
]
const viewports = [
  ['desktop', { width: 1440, height: 1000 }],
  ['mobile', { width: 390, height: 844 }]
]
const stageDirectory = stage === 'before' ? 'antes' : 'depois'
const outputDirectory = new URL(`../../docs/fase-5/acessibilidade/evidencias/${stageDirectory}/`, import.meta.url)

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(baseURL)
      if (response.ok) return
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  throw new Error('O servidor local não respondeu dentro do prazo.')
}

await mkdir(outputDirectory, { recursive: true })

const server = spawn('npm', ['run', 'dev', '--', '--hostname', '127.0.0.1'], {
  detached: true,
  stdio: 'ignore',
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }
})

let browser

try {
  await waitForServer()
  browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium'
  })

  for (const [viewportName, viewport] of viewports) {
    const context = await browser.newContext({ viewport })
    const page = await context.newPage()

    for (const [routeName, route] of routes) {
      await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' })
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()
      const prefix = `${viewportName}-${routeName}`

      await page.screenshot({ path: fileURLToPath(new URL(`${prefix}.png`, outputDirectory)), fullPage: true })
      await writeFile(
        new URL(`${prefix}.json`, outputDirectory),
        JSON.stringify({ stage, viewportName, viewport, route, url: page.url(), ...results }, null, 2)
      )
      console.log(`${prefix}: ${results.violations.length} regra(s) violada(s)`)
    }

    await context.close()
  }
} finally {
  await browser?.close()
  process.kill(-server.pid, 'SIGTERM')
}
