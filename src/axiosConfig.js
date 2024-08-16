import axios from "axios";

const instance = axios.create({
  baseURL: "https://davidphenom.pythonanywhere.com/",
  timeout: 10000, // Adjust timeout as needed
});

// Add a request interceptor to include the token in headers
instance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally handle token refresh if needed

export default instance;
