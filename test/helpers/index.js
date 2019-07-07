

const request = require('supertest');

const app = require('../../app')();

exports.requestGet = async ({ url, query }) => request(app).get(url).query(query);

exports.requestPost = async ({ url, body = '' }) => request(app).post(url).send(body);

exports.requestDelete = async ({ url, params = '' }) => request(app).delete(`${url}/${params}`);

exports.populateDataOnDB = async ({ data, model }) => {
  try {
    return model.bulkCreate(data);
  } catch (error) {
    console.log('There is error on action callled', error);
  }
};

exports.generateTools = [
  {
    id: '400117f1-1388-4eb9-a10f-c8b30e2b40b1',
    title: 'Title 1',
    link: 'Link 1',
    description: 'Description 1',
    tags: ['tag_1', 'tag_2'],
    createdAt: new Date().toISOString(),
  }, {
    id: '400117f1-1388-4eb9-a10f-c8b30e2b40b2',
    title: 'Title 2',
    link: 'Link 2',
    description: 'Description 2',
    tags: ['tag_3', 'tag_2'],
    createdAt: new Date().toISOString(),
  }, {
    id: '400117f1-1388-4eb9-a10f-c8b30e2b40b3',
    title: 'Title 3',
    link: 'Link 3',
    description: 'Description 3',
    tags: ['tag_1', 'tag_4'],
    createdAt: new Date().toISOString(),
  }, {
    id: '400117f1-1388-4eb9-a10f-c8b30e2b40b4',
    title: 'Title 4',
    link: 'Link 4',
    description: 'Description 4',
    tags: ['tag_4', 'tag_5'],
    createdAt: new Date().toISOString(),
  }, {
    id: '400117f1-1388-4eb9-a10f-c8b30e2b40b5',
    title: 'Title 5',
    link: 'Link 5',
    description: 'Description 5',
    tags: ['tag_1', 'tag_4'],
    createdAt: new Date().toISOString(),
  },
];
