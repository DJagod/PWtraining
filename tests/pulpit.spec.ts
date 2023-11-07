import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test.only('Quick payment with correct data', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testerDJ';
    const userPassword = 'haslo123';

    const receiverId = '1';
    const transferAmount = '420';
    const transferTitle = 'Zwrot środków';
    const expectedTransferReceiver = 'Jan Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('Succesfull mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerDJ');
    await page.getByTestId('password-input').fill('haslo123');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('504 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('30');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    await page.getByTestId('close-button').click();
    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 30,00PLN na numer 504 xxx xxx',
    );
  });
});
