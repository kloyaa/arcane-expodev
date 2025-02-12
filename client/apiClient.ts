import axios from "axios";

const BASE_URL = "http://10.0.2.2:3432/api"; // Change for real devices

// Create Axios instance with default headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "nodex-user-origin": "mobile",
    "nodex-access-key": "v7pb6wylg4m0xf0kx5zzoved",
    "nodex-secret-key": "glrvdwi46mq00fg1oqtdx3rg",
    "nodex-role-for": "admin",
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor (Optional: Attach Auth Token if needed)
apiClient.interceptors.request.use(
  async (config) => {
    // Example: Dynamically modify headers if needed
    // const authToken = await AsyncStorage.getItem("authToken");
    // if (authToken) config.headers.Authorization = `Bearer ${authToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handles errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
