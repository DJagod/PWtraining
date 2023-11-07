import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {

  test.only('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testerDJ';
    const userPassword = 'haslo123';
    const expectedUserName = 'Jan Demobankowy';
    
    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccesful login with too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');

  });

  test('unsuccesful login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerDJ');
    await page.getByTestId('password-input').fill('haslo');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');

  });
});