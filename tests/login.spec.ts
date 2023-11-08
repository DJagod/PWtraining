import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = 'testerDJ';
    const userPassword = 'haslo123';
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccesful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectLogin = 'tester';
    const expectedMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(incorrectLogin);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedMessage,
    );
  });

  test('unsuccesful login with too short password', async ({ page }) => {
    // Arrange
    const correctLogin = 'testerDJ';
    const incorrectPassword = 'haslo';
    const expectedMessage = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(correctLogin);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedMessage,
    );
  });
});
