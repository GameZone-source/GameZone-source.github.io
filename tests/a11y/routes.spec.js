const { test, expect } = require('playwright/test')
const AxeBuilder = require('@axe-core/playwright').default

const routes = ['/', '/reviews/', '/reviews/elden-ring/', '/descoberta/', '/sobre/', '/contato/', '/impacto/']

for (const route of routes) {
  test(`${route} não possui violações Axe sérias ou críticas`, async ({ page }) => {
    await page.goto(route)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    const blocking = results.violations.filter(({ impact }) => ['serious', 'critical'].includes(impact))

    expect(blocking).toEqual([])
  })

  test(`${route} revela o link de salto ao pressionar Tab`, async ({ page }) => {
    await page.goto(route)
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: /pular para o conteúdo principal/i })).toBeFocused()
  })
}
