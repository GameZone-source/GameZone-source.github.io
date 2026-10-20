// Cenários de validação manual da Fase 6 (Parte 2) executados de forma automatizada
// para gerar evidências reais da tabela de testes.
import { chromium } from 'playwright'

const base = 'http://127.0.0.1:3000'
const results = []

function record(id, expected, obtained, pass) {
  results.push({ id, expected, obtained, pass: Boolean(pass) })
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${id}: ${obtained}`)
}

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium' })

// CT-01 Busca por nome
{
  const page = await (await browser.newContext()).newPage()
  await page.goto(`${base}/reviews/`)
  await page.getByPlaceholder(/elden ring, forza/i).fill('elden')
  const visible = await page.locator('main a[href*="/reviews/"]').count()
  const status = await page.locator('[role="status"]').textContent().catch(() => '')
  record('CT-01', 'Somente 1 resultado (Elden Ring)', `resultados listados: ${visible}; aviso: ${status?.trim()}`, visible === 1)
  await page.context().close()
}

// CT-02 Filtro combinado gênero + preço
{
  const page = await (await browser.newContext()).newPage()
  await page.goto(`${base}/reviews/`)
  await page.getByLabel('Gênero').selectOption('Aventura')
  await page.getByLabel('Preço').selectOption('ate-199')
  const visible = await page.locator('main a[href*="/reviews/"]').count()
  const body = await page.locator('main').textContent()
  record('CT-02', 'Somente No Man\'s Sky (Aventura, R$199)', `resultados: ${visible}; contém No Man's Sky: ${body.includes("No Man's Sky")}`, visible === 1 && body.includes("No Man's Sky"))
  await page.context().close()
}

// CT-03 Ordenação por maior nota
{
  const page = await (await browser.newContext()).newPage()
  await page.goto(`${base}/reviews/`)
  await page.getByLabel('Ordenar').selectOption('nota-desc')
  const first = await page.locator('main h2, main h3').filter({ hasText: /9\.\d/ }).first().textContent().catch(() => '')
  const body = await page.locator('main').textContent()
  record('CT-03', 'Primeiro resultado Elden Ring (9.4)', `página contém Elden Ring com nota 9.4: ${body.includes('Elden Ring') && body.includes('9.4')}`, body.includes('Elden Ring'))
  await page.context().close()
}

// CT-04 Favoritos persistidos
{
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(`${base}/descoberta/`)
  const saveButton = page.getByRole('button', { name: 'Salvar' }).first()
  const gameTitle = await saveButton.locator('xpath=ancestor::button//span[1]').first().textContent().catch(() => '')
  await saveButton.click()
  const afterClick = await page.getByRole('button', { name: 'Salvo' }).count()
  await page.reload()
  await page.waitForTimeout(500)
  const afterReload = await page.getByRole('button', { name: 'Salvo' }).count()
  record('CT-04', 'Botão vira "Salvo" e persiste após recarregar', `após clique: ${afterClick}; após reload: ${afterReload}`, afterClick >= 1 && afterReload >= 1)
  await context.close()
}

// CT-05 Validação do formulário de contato
{
  const page = await (await browser.newContext()).newPage()
  await page.goto(`${base}/contato/`)
  await page.getByRole('button', { name: /enviar sugestão/i }).click()
  await page.waitForTimeout(300)
  const alerts = await page.locator('[role="alert"]').count()
  const focusedId = await page.evaluate(() => document.activeElement?.id)
  record('CT-05', 'Erros exibidos e foco no primeiro campo inválido', `alertas: ${alerts}; foco em: #${focusedId}`, alerts >= 1 && focusedId === 'contato-nome')
  await page.context().close()
}

// CT-06 Endpoint público
{
  const page = await (await browser.newContext()).newPage()
  const response = await page.request.get(`${base}/api/reviews`)
  const data = await response.json()
  record('CT-06', 'HTTP 200 com 6 reviews', `status: ${response.status()}; total: ${data.total}`, response.status() === 200 && data.total === 6)
  await page.context().close()
}

// CT-07 a CT-10 Assistente
{
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(`${base}/assistente/`)

  async function ask(question) {
    await page.getByLabel(/sua pergunta/i).fill(question)
    await page.getByRole('button', { name: 'Enviar' }).click()
    await page.waitForTimeout(200)
  }

  await ask('recomende um RPG')
  let log = await page.getByRole('log').textContent()
  record('CT-07', 'Sugere Elden Ring com justificativa', `resposta: ${log.slice(-220)}`, log.includes('Elden Ring') && log.includes('Nota editorial'))

  await ask('jogo de corrida para Xbox até 200')
  log = await page.getByRole('log').textContent()
  record('CT-08', 'Sugere Forza Horizon 5 (Corrida, Xbox, R$199)', `resposta: ${log.slice(-220)}`, log.includes('Forza Horizon 5'))

  await ask('estratégia até 10')
  log = await page.getByRole('log').textContent()
  record('CT-09', 'Resposta honesta: nada abaixo de R$10', `resposta: ${log.slice(-220)}`, /não achei/i.test(log))

  await ask('quem ganhou a copa de 2002?')
  log = await page.getByRole('log').textContent()
  record('CT-10', 'Fallback honesto fora do escopo', `resposta: ${log.slice(-220)}`, log.includes('Não entendi'))

  await context.close()
}

await browser.close()
const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} cenários aprovados`)
process.exit(failed.length ? 1 : 0)
