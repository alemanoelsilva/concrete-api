

const modelMock = {
  create: jest.fn(),
  destroy: jest.fn(),
  findAll: jest.fn(() => ([{
    dataValues: {
      id: '400117f1-1388-4eb9-a10f-c8b30e2b40b4',
      title: 'Title',
      link: 'Link',
      description: 'Description',
      tags: ['tag_1', 'tag_2'],
      createdAt: new Date().toISOString(),
    },
  }, {
    dataValues: {
      id: '400117f1-1388-4eb9-a10f-c8b30e2b40b5',
      title: 'Title 2',
      link: 'Link 2',
      description: 'Description 2',
      tags: ['tag_2', 'tag_3'],
      createdAt: new Date().toISOString(),
    },
  }])),
};

const repository = require('../../api/tools/repository')(modelMock);

describe('Tools Repository Unit tests', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('Repository save tools', () => {
    test('Should execute model.create function', async () => {
      await repository.save();

      expect(modelMock.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Repository get tools', () => {
    test('Should execute model.findAll function and return all tools', async () => {
      const { tools } = await repository.getAll({});

      expect(tools[0].title).toEqual('Title');
      expect(tools[1].title).toEqual('Title 2');
      expect(tools.length).toEqual(2);

      expect(modelMock.findAll).toHaveBeenCalledTimes(1);
    });

    test('Should execute model.findAll function and return only one tool filtered by tag_1', async () => {
      const { tools } = await repository.getAll({ tag: 'tag_1' });

      expect(tools[0].title).toEqual('Title');
      expect(tools.length).toEqual(1);

      expect(modelMock.findAll).toHaveBeenCalledTimes(1);
    });

    test('Should execute model.findAll function and return only two tools filtered by tag_2', async () => {
      const { tools } = await repository.getAll({ tag: 'tag_2' });

      expect(tools[0].title).toEqual('Title');
      expect(tools[1].title).toEqual('Title 2');
      expect(tools.length).toEqual(2);

      expect(modelMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Repository delete tools', () => {
    test('Should execute model.destroy function', async () => {
      await repository.delete({ id: '' });

      expect(modelMock.destroy).toHaveBeenCalledTimes(1);
    });
  });
});
