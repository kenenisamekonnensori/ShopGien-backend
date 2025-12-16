
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import logger from "../config/logger";

export function createHttpClient(config: AxiosRequestConfig): AxiosInstance {
  const client = axios.create({
    timeout: 10000,
    ...config,
  });

  client.interceptors.request.use((req) => {
    logger.debug("External request", {
      method: req.method,
      url: req.url,
    });
    return req;
  });

  client.interceptors.response.use(
    (res) => res,
    (error) => {
      logger.error("External API error", {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
      });
      return Promise.reject(error);
    }
  );

  return client;
}

