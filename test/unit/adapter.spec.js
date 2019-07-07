

const {
  getAllTools,
  createTool,
  deleteTool,
} = require('../../api/tools/adapter');

describe('Tools Adapter Unit tests', () => {
  const mocks = {
    query: '',
    params: '',
    body: '',
    repository: {
      getAll: jest.fn(() => ({ tools: '', count: 1 })),
      save: jest.fn(data => ({ ...data, id: '', createdAt: '' })),
      delete: jest.fn(id => (id % 2 ? 1 : 0)),
    },
    formatters: {
      response: jest.fn(data => data),
    },
    logger: {
      info: jest.fn(),
      error: jest.fn(),
    },
    onSuccess: jest.fn(),
    onError: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  describe('Get all tools', () => {
    test('Should call the onSuccess Function with success', async () => {
      await getAllTools(mocks);

      expect(mocks.logger.info).toHaveBeenCalledTimes(1);
      expect(mocks.repository.getAll).toHaveBeenCalledTimes(1);
      expect(mocks.formatters.response).toHaveBeenCalledTimes(1);
      expect(mocks.onSuccess).toHaveBeenCalledTimes(1);
      expect(mocks.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return error when getAll function was called', async () => {
      await getAllTools({
        ...mocks,
        repository: {
          getAll: () => { throw new Error('Error getAll'); },
        },
      });

      expect(mocks.logger.info).toHaveBeenCalledTimes(1);
      expect(mocks.formatters.response).toHaveBeenCalledTimes(0);
      expect(mocks.onSuccess).toHaveBeenCalledTimes(0);
      expect(mocks.onError).toHaveBeenCalledTimes(1);
    });

    test('Should return error when response formatter Function was called', async () => {
      await getAllTools({
        ...mocks,
        formatters: {
          response: () => { throw new Error('Error formattersResponse'); },
        },
      });

      expect(mocks.logger.info).toHaveBeenCalledTimes(1);
      expect(mocks.logger.error).toHaveBeenCalledTimes(1);
      expect(mocks.repository.getAll).toHaveBeenCalledTimes(1);
      expect(mocks.onSuccess).toHaveBeenCalledTimes(0);
      expect(mocks.onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Create a tool', () => {
    test('Should call the onSuccess Function with success', async () => {
      await createTool(mocks);

      expect(mocks.logger.info).toHaveBeenCalledTimes(1);
      expect(mocks.repository.save).toHaveBeenCalledTimes(1);
      expect(mocks.onSuccess).toHaveBeenCalledTimes(1);
      expect(mocks.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return error when save Function was called', async () => {
      await createTool({
        ...mocks,
        repository: {
          save: () => { throw new Error('Error save'); },
        },
      });

      expect(mocks.logger.error).toHaveBeenCalledTimes(1);
      expect(mocks.onSuccess).toHaveBeenCalledTimes(0);
      expect(mocks.onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete a tool', () => {
    test('Should call the onSuccess Function with success', async () => {
      await deleteTool(mocks);

      expect(mocks.logger.info).toHaveBeenCalledTimes(1);
      expect(mocks.repository.delete).toHaveBeenCalledTimes(1);
      expect(mocks.onSuccess).toHaveBeenCalledTimes(1);
      expect(mocks.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return error when delete Function was called', async () => {
      await deleteTool({
        ...mocks,
        repository: {
          delete: () => { throw new Error('Error delete'); },
        },
      });

      expect(mocks.logger.error).toHaveBeenCalledTimes(1);
      expect(mocks.onSuccess).toHaveBeenCalledTimes(0);
      expect(mocks.onError).toHaveBeenCalledTimes(1);
    });
  });
});
