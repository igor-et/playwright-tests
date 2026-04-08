import { test, expect } from '@playwright/test';

function generateEmail() {
  return `aqa_${Date.now()}@test.com`;
}

function generateInvalidEmail() {
    return `aqa_${Date.now()}@@@@test.com`;
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign up' }).click();
});


//  POSITIVE TEST
test('successful user registration', async ({ page }) => {
  await page.locator('#signupName').fill('John');
  await page.locator('#signupLastName').fill('Doe');
  await page.locator('#signupEmail').fill(generateEmail());
  await page.locator('#signupPassword').fill('Password123!');
  await page.locator('#signupRepeatPassword').fill('Password123!');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page).toHaveURL(/garage/);
});

// NEGATIVE TESTS
//  1. Empty name
test('should show error if name is empty', async ({ page }) => {
  const nameInput = page.locator('#signupName');
  const lastNameInput = page.locator('#signupLastName');
  await nameInput.click();
  await lastNameInput.click(); 
  await expect(page.getByText('Name required')).toBeVisible();
});

//  2. Short lastName
test('should show error for short lastName', async ({ page }) => {  
  await page.locator('#signupLastName').click();
  await page.locator('#signupLastName').fill('q');
  await page.locator('#signupName').click();
  await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
});

//  3. Invalid email
test('should show error for invalid email', async ({ page }) => {
  await page.locator('#signupEmail').fill(generateInvalidEmail());
  await page.locator('#signupPassword').click();
  await expect(page.locator('#signupEmail ~ .invalid-feedback')).toBeVisible();
});


//  4. Passwords do not match
test('should show error if passwords do not match', async ({ page }) => {
    await page.locator('#signupPassword').fill('Password123!');
    await page.locator('#signupRepeatPassword').fill('Password123');
    await page.locator('#signupPassword').click();
    await expect(page.getByText('Passwords do not match')).toBeVisible();
});


//  5. Short password
test('should show error for short password', async ({ page }) => {
  const passwortTooShortError = "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
  await page.locator('#signupPassword').fill('123');
  await page.locator('#signupRepeatPassword').click();
  await expect(page.getByText(passwortTooShortError)).toBeVisible();
});



