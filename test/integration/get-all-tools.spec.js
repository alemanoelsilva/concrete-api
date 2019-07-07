

const {
  requestGet,
} = require('../helpers');

const TOOLS_URL = '/api/tools';

const Tool = require('../../api/tools/model');

const {
  populateDataOnDB,
  generateTools,
} = require('../helpers');

describe('Get All Tools Integration Test', () => {
  beforeAll(async () => populateDataOnDB({ data: generateTools, model: Tool }));

  afterAll(async () => Tool.destroy({ where: {} }));

  describe('Get tools with success', () => {
    test('Should return all Tools', async () => {
      try {
        const { body, statusCode } = await requestGet({ url: TOOLS_URL });

        expect(statusCode).toEqual(200);
        expect(body.count).toEqual(5);
        expect(body.tools.length).toEqual(5);
        expect(body.tools).forEacht((tool, index) => {
          expect(tool).toHaveProperty('id', 'title', 'link', 'description', 'createdAt', 'tags');
          expect(tool.id).toEqual(generateTools[index].id);
          expect(tool.title).toEqual(generateTools[index].title);
          expect(tool.link).toEqual(generateTools[index].link);
          expect(tool.description).toEqual(generateTools[index].description);
          expect(tool.tags).toEqual(generateTools[index].tags);
        });
      } catch (error) {}
    });

    test('Should return only one Tool filtered by tag equal "tag_5"', async () => {
      try {
        const { body, statusCode } = await requestGet({
          url: TOOLS_URL,
          query: { tag: 'tag_5' },
        });

        expect(statusCode).toEqual(200);
        expect(body.count).toEqual(1);
        expect(body.tools.length).toEqual(1);
        expect(body.tools).forEacht((tool, index) => {
          expect(tool).toHaveProperty('id', 'title', 'link', 'description', 'createdAt', 'tags');
          expect(tool.id).toEqual(generateTools[index].id);
          expect(tool.title).toEqual(generateTools[index].title);
          expect(tool.link).toEqual(generateTools[index].link);
          expect(tool.description).toEqual(generateTools[index].description);
          expect(tool.tags).toEqual(generateTools[index].tags);
        });
      } catch (error) {}
    });

    test('Should return three Tools filtered by tag equal "tag_4"', async () => {
      try {
        const { body, statusCode } = await requestGet({
          url: TOOLS_URL,
          query: { tag: 'tag_4' },
        });

        expect(statusCode).toEqual(200);
        expect(body.count).toEqual(3);
        expect(body.tools.length).toEqual(3);
        expect(body.tools).forEacht((tool, index) => {
          expect(tool).toHaveProperty('id', 'title', 'link', 'description', 'createdAt', 'tags');
          expect(tool.id).toEqual(generateTools[index].id);
          expect(tool.title).toEqual(generateTools[index].title);
          expect(tool.link).toEqual(generateTools[index].link);
          expect(tool.description).toEqual(generateTools[index].description);
          expect(tool.tags).toEqual(generateTools[index].tags);
        });
      } catch (error) {}
    });

    test('Should return any Tool filtered by tag equal "tag_x"', async () => {
      try {
        const { body, statusCode } = await requestGet({
          url: TOOLS_URL,
          query: { tag: 'tag_x' },
        });

        expect(statusCode).toEqual(200);
        expect(body.count).toEqual(0);
        expect(body.tools.length).toEqual(0);
        expect(body.tools).toEqual([]);
      } catch (error) {}
    });
  });
});
