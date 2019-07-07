

const { formatterResponseTools } = require('../../api/tools/formatters');

describe('Tools Formatters Unit tests', () => {
  const mock = {
    moment: jest.fn(() => ({
      format: jest.fn(data => data),
    })),
  };

  const tools = [{
    id: '400117f1-1388-4eb9-a10f-c8b30e2b40b4',
    title: 'Title',
    link: 'Link',
    description: 'Description',
    tags: ['tag_1', 'tag_2'],
    createdAt: new Date().toISOString(),
  }];

  beforeEach(() => jest.clearAllMocks());

  describe('Format all tools', () => {
    test('Should return an array of tools with at least two tools formatted', async () => {
      const [tool1, tool2] = await formatterResponseTools({ moment: mock.moment, formatDate: '' })([...tools, ...tools]);

      expect(tool1.id).toEqual(tools[0].id);
      expect(tool1.title).toEqual(tools[0].title);
      expect(tool1.link).toEqual(tools[0].link);
      expect(tool1.description).toEqual(tools[0].description);
      expect(tool1.tags).toEqual(tools[0].tags);

      expect(tool2.id).toEqual(tools[0].id);
      expect(tool2.title).toEqual(tools[0].title);
      expect(tool2.link).toEqual(tools[0].link);
      expect(tool2.description).toEqual(tools[0].description);
      expect(tool2.tags).toEqual(tools[0].tags);

      expect(mock.moment).toHaveBeenCalledTimes(2);
    });

    test('Should return an array of tools with only one tool formatted', async () => {
      const [tool] = await formatterResponseTools({ moment: mock.moment, formatDate: '' })(tools);

      expect(tool.id).toEqual(tools[0].id);
      expect(tool.title).toEqual(tools[0].title);
      expect(tool.link).toEqual(tools[0].link);
      expect(tool.description).toEqual(tools[0].description);
      expect(tool.tags).toEqual(tools[0].tags);

      expect(mock.moment).toHaveBeenCalledTimes(1);
    });

    test('Should return an array empty when tools were empty', async () => {
      const tool = await formatterResponseTools({ moment: mock.moment, formatDate: '' })([]);

      expect(tool.length).toEqual(0);

      expect(mock.moment).toHaveBeenCalledTimes(0);
    });
  });
});
