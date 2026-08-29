export default async function run(page, ui) {
  await page.setViewportSize({ width: 390, height: 844 });
  const enter = (await ui.snapshot()).match(/@(e\d+) button "Track my application"/)?.[1];
  await ui.click(enter);
  await page.waitForTimeout(500);
  const results = [];
  for (const tab of ['Find','Eligibility','Tracker','Documents','Payment','Deadlines','Alerts','Profile','Insights','Settings','Institutes','Help']) {
    const before = (await ui.snapshot());
    const ref = before.match(new RegExp(`@(e\\d+) button "${tab}"`))?.[1];
    if (!ref) { results.push([tab, 'TAB NOT FOUND']); continue; }
    await ui.click(ref);
    await page.waitForTimeout(450);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    results.push([tab, `overflow=${overflow}`]);
    await page.screenshot({ path: `qa-${tab.toLowerCase()}.png`, fullPage: true });
  }
  // open a scheme detail sheet
  const find = (await ui.snapshot()).match(/@(e\d+) button "Find"/)?.[1];
  await ui.click(find); await page.waitForTimeout(400);
  const detail = (await ui.snapshot()).match(/@(e\d+) button "View details"/)?.[1];
  if (detail) { await ui.click(detail); await page.waitForTimeout(500); await page.screenshot({ path: 'qa-sheet.png', fullPage: false }); }
  return results;
}
