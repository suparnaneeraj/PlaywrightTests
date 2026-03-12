import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, 'env/config.env') });
dotenv.config({ path: path.resolve(__dirname, 'env/.env') });


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [
      ['github'],
      ['html', { open: 'never' }],
      ['allure-playwright']
    ]
  : [
      ['list'],
      ['html']
    ],

  use: {
   
    baseURL: process.env.APP_URL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: "**/tests/ui/**/*.spec.ts",
    },

  ],
});
