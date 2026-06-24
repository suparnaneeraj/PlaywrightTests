import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, 'env/config.env') });
dotenv.config({ path: path.resolve(__dirname, 'env/.env') });

const requiredEnv = ['APP_URL','API_URL', 'USERNAME', 'PASSWORD'];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ?  [
        ['github'],
        ['allure-playwright']
      ]
    : [
        ['html'],['list'],
      ],

  use: {
   
    baseURL: process.env.APP_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: "**/tests/ui/**/*.spec.ts",
    },

  ],
});
