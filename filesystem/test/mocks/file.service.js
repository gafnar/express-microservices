module.exports = {
  uploadFile: () => jest.fn(() => ({ url: 'https://url.com/file.jpg' })),
  deleteFile: () => jest.fn(),
  getFileByKey: () => ({Body: '123456', ContentLength: 6 }),
  createKey: () => jest.fn(() => '12345.jpg'),
};