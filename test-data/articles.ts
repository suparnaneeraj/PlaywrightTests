import { faker } from '@faker-js/faker';

export interface Article {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export function generateArticle(type: 'basic' | 'oneTag' | 'multiTag' | 'existingTags'): Article {
  switch (type) {
    case 'basic':
      return {
        title: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(2),
        tagList: [],
      };

    case 'oneTag':
      return {
        title: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(2),
        tagList: [faker.hacker.noun()],
      };

    case 'multiTag':
      return {
        title: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(2),
        tagList: [faker.hacker.noun(), faker.color.human()],
      };

    case 'existingTags':
      return {
        title: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(2),
        tagList: ['YouTube'],
      };

    default:
      throw new Error(`Unknown article type: ${type}`);
  }
}