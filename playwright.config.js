// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['list']
  ],

  timeout: 30000,

  use: {
    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD,
    },

    trace: 'on',
    headless: false,
    ignoreHTTPSErrors: true,
    actionTimeout: 10000,

    // screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium-qauto',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL,
      },
    },
    {
      name: 'chromium-qauto2',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL_2,
      },
    },
  ],
});