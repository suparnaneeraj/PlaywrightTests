import { Page, Response } from '@playwright/test';

export function waitForApiResponse( page: Page, urlPart: string, method: string): Promise<Response> {
  return page.waitForResponse( response => response.url().includes(urlPart) && response.request().method() === method );
}