import { faker } from '@faker-js/faker';

export interface Article {
  title: string;
  overview: string;
  description: string;
  tags?: string[];
}

export function generateArticle(type: 'basic' | 'oneTag' | 'multiTag' | 'existingTags'): Article {
  switch (type) {
    case 'basic':
      return {
        title: faker.lorem.words(2),
        overview: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(2),
        tags: [],
      };

    case 'oneTag':
      return {
        title: faker.lorem.words(2),
        overview: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(2),
        tags: [faker.hacker.noun()],
      };

    case 'multiTag':
      return {
        title: faker.lorem.words(2),
        overview: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(2),
        tags: [faker.hacker.noun(), faker.color.human()],
      };

    case 'existingTags':
      return {
        title: faker.lorem.words(2),
        overview: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(2),
        tags: ['YouTube'],
      };

    default:
      throw new Error(`Unknown article type: ${type}`);
  }
}