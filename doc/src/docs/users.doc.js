const produces = ['application/json'];
module.exports = {
  tags: {
    name: 'users',
    description: 'Microservice users',
  },
  paths: {
    '/users': {
      post: {
        tags: ['users'],
        summary: 'User create',
        description: '',
        produces,
        parameters: [
          {
            name: 'body',
            in: 'body',
            description: 'User object',
            required: true,
            schema: {
              $ref: '#/definitions/UserModel',
            },
          },
        ],
        responses: {
          201: {
            description: 'User successfully created!',
            schema: {
              $ref: '#/definitions/UserModel',
            },
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
    '/users/forgot-password': {
      post: {
        tags: ['users'],
        summary: 'User forgot password',
        description: '',
        produces,
        parameters: [
          {
            name: 'body',
            in: 'body',
            description: 'Object edit',
            required: true,
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successfuly!',
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
  },
  definitions: {
    UserModel: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
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
