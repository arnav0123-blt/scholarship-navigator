export default async function run(page, ui) {
  const r = {};
  r.h1 = await page.evaluate(() => document.querySelector('h1').textContent);
  r.brand = await page.evaluate(() => document.querySelector('.portal-brand span').textContent);
  r.langBtn = await page.evaluate(() => document.querySelector('[data-action=lang]').textContent);
  for (const label of ['Deadlines', 'Alerts', 'Profile', 'Insights', 'Settings']) {
    await page.getByRole('button').filter({ hasText: label }).first().click();
    await page.waitForTimeout(120);
    r[label] = await page.evaluate(() => document.querySelector('h1')?.textContent || 'NO H1');
  }
  // dark mode toggle
  await page.evaluate(() => document.querySelector('[data-action=dark]').click());
  await page.waitForTimeout(150);
  r.darkMode = await page.evaluate(() => !!document.querySelector('.portal.dark'));
  return r;
}
