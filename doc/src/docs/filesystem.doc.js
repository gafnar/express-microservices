const tags = ['filesystem'];
const produces = ['application/json'];
const authorizationHeader = {
  in: 'header',
  name: 'authorization',
  schema: {
    type: 'string',
    required: true,
  },
};


module.exports = {
  tags: {
    name: tags[0],
    description: 'Microservice whit S3 to save, update and delete file',
  },
  paths: {
    '/file': {
      post: {
        tags,
        summary: 'Upload an file',
        description: '',
        produces,
        parameters: [
          authorizationHeader,
          {
            name: 'file',
            in: 'formData',
            description: 'file to upload',
            required: true,
            type: 'file',
          },
        ],
        responses: {
          201: {
            description: 'successfuly upload',
            schema: {
              $ref: '#/definitions/FileResponse',
            },
          },
          400: {
            description: 'Bad request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/file/{key}': {
      put: {
        tags,
        summary: 'Update an file',
        description: '',
        produces,
        parameters: [
          authorizationHeader,
          {
            name: 'key',
            in: 'path',
            description: 'key file identifier',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            description: 'Object edit',
            required: true,
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'successfuly updated',
            schema: {
              $ref: '#/definitions/FileResponse',
            },
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'File not found',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
      delete: {
        tags,
        summary: 'Delete an file',
        description: '',
        produces,
        parameters: [
          authorizationHeader,
          {
            name: 'key',
            in: 'path',
            description: 'key file identifier',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'successfuly removed',
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'File not found',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
      get: {
        tags,
        summary: 'get an file',
        description: '',
        produces,
        parameters: [
          authorizationHeader,
          {
            name: 'key',
            in: 'path',
            description: 'key file identifier',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Successfuly!',
            schema: {
              $ref: '#/definitions/FileResponse',
            },
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'File not found',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/file/download/{key}': {
      get: {
        tags,
        summary: 'Download an file',
        description: '',
        produces,
        parameters: [
          authorizationHeader,
          {
            name: 'key',
            in: 'path',
            description: 'key file identifier',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Successfuly!',
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'File not found',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
  },
  definitions: {
    FileResponse: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        key: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
      },
    },
  },
};
