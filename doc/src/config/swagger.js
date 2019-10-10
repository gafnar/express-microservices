const authDocumentation = require('../docs/auth.doc');
const usersDocumentation = require('../docs/users.doc');
const filesystemDocumentation = require('../docs/filesystem.doc');

module.exports = {
  swagger: '2.0',
  info: {
    version: '0.0.0',
    title: 'Express microservices',
    description: '',
  },
  schemes: [
    'http',
  ],
  host: 'localhost',
  tags: [
    authDocumentation.tags,
    usersDocumentation.tags,
    filesystemDocumentation.tags,
  ],
  paths: {
    ...authDocumentation.paths,
    ...usersDocumentation.paths,
    ...filesystemDocumentation.paths,
  },
  definitions: {
    ApiResponse: {
      type: 'object',
      properties: {
        result: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
        },
        data: {
          type: 'object',
        },
      },
    },
    ...filesystemDocumentation.definitions,
    ...authDocumentation.definitions,
    ...usersDocumentation.definitions,
  },
};
