// @ts-check
import { test, expect } from '@playwright/test';
import resources from '../frontend/src/locales/ru.js';

const { ru: { translation: t } } = resources;

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Chat App/);
});

test('get sign up page', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Click the sign up link.
  await page.getByRole('link', { name: t.signUpPage.title }).click();

  // Expects page to have a heading with the name.
  await expect(page.getByRole('heading', { name: t.signUpPage.title })).toBeVisible();
});
