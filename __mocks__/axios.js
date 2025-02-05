export default {
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({})), // Mock Axios create to return an empty object
};
