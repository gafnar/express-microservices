const { createInternalResponse } = require('../services/response.service');

module.exports = {
  fileCreatedOK: createInternalResponse(201, '201', 'File successfully created!'),
  fileGetUrlOK: createInternalResponse(200, '200', 'Successfully!'),
  fileDeletedOK: createInternalResponse(200, '200', 'File successfully removed!'),
  fileNotSendKO: createInternalResponse(400, '400', 'File not send.'),
  fileUploadKO: createInternalResponse(400, '400', 'The file has not been uploaded.'),
  fileNotFoundKO: createInternalResponse(404, '404', 'File not found.'),
  fileDeletedKO: createInternalResponse(400, '400', 'The file could not be deleted.'),
};
