import apiClient from '../src/Api/client'; // Import after setting up mocks
import axios from 'axios';
import Config from 'react-native-config';

const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  // Add other methods as needed
};

// apiClient.test.js
jest.mock('axios', () => ({
  create: jest.fn(() => ({})), // Mock Axios create to return an empty object
}));

describe('apiClient Configuration', () => {
  it('should create an Axios instance with the correct base URL', () => {
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: Config.BASE_API_URL,
      }),
    );
  });

  it('should set the Content-type header to application/json', () => {
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: {
          'Content-type': 'application/json',
        },
      }),
    );
  });

  it('should include the API key as a query parameter', () => {
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        params: {
          key: Config.API_KEY,
        },
      }),
    );
  });

  it('should export the correctly configured Axios instance', () => {
    // Verify the instance is the one returned by the mocked axios.create
    expect(apiClient).toStrictEqual(axios.create());
  });
});
