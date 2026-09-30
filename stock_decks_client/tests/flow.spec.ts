import { test, expect } from '@playwright/test';

//Flow:
//Seed cards, sell one and check expected balance and equity. Buy new pack. Open sell panel, add 2 cards and remove 1, sell card, check expected balance and equity.

test('test', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('userCards', JSON.stringify([
      { id: 'seed-1', symbol: 'AAPL', name: 'Apple Inc.',        sector: 'Technology', price: 100, description: 'Consumer electronics and software.', imgurl: '/data/sectorIcons/Technology.png', tags: [], dateAcquired: '2026-01-05T00:00:00.000Z', isNew: true  },
      { id: 'seed-2', symbol: 'NVDA', name: 'NVIDIA Corp.',       sector: 'Technology', price: 250, description: 'GPUs and AI hardware.',            imgurl: '/data/sectorIcons/Technology.png', tags: [], dateAcquired: '2026-02-10T00:00:00.000Z', isNew: true  },
      { id: 'seed-3', symbol: 'JNJ',  name: 'Johnson & Johnson',  sector: 'Healthcare', price: 175, description: 'Pharma and medical devices.',      imgurl: '/data/sectorIcons/Healthcare.png', tags: [], dateAcquired: '2026-03-01T00:00:00.000Z', isNew: false },
      { id: 'seed-4', symbol: 'JPM',  name: 'JPMorgan Chase',     sector: 'Financials', price: 300, description: 'Banking and financial services.', imgurl: '/data/sectorIcons/Financials.png', tags: [], dateAcquired: '2026-04-15T00:00:00.000Z', isNew: false },
    ]));
    localStorage.setItem('userBalance', '100');
  });
  await page.goto('http://localhost:3000/home');
  await page.getByRole('link', { name: 'My Deck' }).click();
  await expect(page.locator('body')).toContainText('Total Equity: $825');
  await expect(page.locator('body')).toContainText('Balance: $100');
  await page.locator('div').filter({ hasText: /^AAPL$/ }).click();
  await page.getByRole('button', { name: 'Sell Card', exact: true }).click();
  await page.getByRole('button', { name: 'Sell 1 card for $' }).click();
  await expect(page.locator('body')).toContainText('Total Equity: $725');
  await expect(page.locator('body')).toContainText('Balance: $200');
  await page.getByRole('link', { name: 'Buy Packs' }).click();
  await page.getByText('Epic Packepic pack$155 random').click();
  await page.getByRole('button', { name: 'Confirm Purchase' }).click();
  await page.locator('div').nth(5).click();
  await page.locator('div').nth(5).click();
  await page.locator('div').nth(5).click();
  await page.locator('div').nth(5).click();
  await page.locator('div').nth(5).click();
  await page.locator('div').nth(5).click();
  await page.getByRole('button', { name: 'Sell Cards' }).click();
  await page.locator('div').filter({ hasText: /^NVDA$/ }).click();
  await page.locator('div').filter({ hasText: /^JNJ$/ }).click();
  await page.getByRole('listitem').filter({ hasText: 'NVDA$250.00Remove' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Sell 1 card for $' }).click();
  await expect(page.locator('body')).toContainText('Total Equity: $550');
  await expect(page.locator('body')).toContainText('Balance: $375');
});

//
/*
EXAMPLE TEST
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

//Command to record click flow as test output:
//npx playwright codegen --output tests/flow.spec.ts http://localhost:3000
*/