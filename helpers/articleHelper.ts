import { Locator } from '@playwright/test';

export async function getNormalizedTags(locator: Locator): Promise<string[]> {
  return (await locator.allTextContents())
    .map(tag => tag.trim().toLowerCase());
}