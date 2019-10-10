module.exports = {
  tags: {
    name: 'auth',
    description: 'Service to authenticanted users',
  },
  paths: {
    '/auth/login': {
      post: {
        tags: ['auth'],
        summary: 'User login',
        description: '',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            description: 'Login object',
            required: true,
            schema: {
              $ref: '#/definitions/loginCreated',
            },
          },
        ],
        responses: {
          200: {
            description: 'User login successfully!',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
  },
  definitions: {
    loginCreated: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  },
};
