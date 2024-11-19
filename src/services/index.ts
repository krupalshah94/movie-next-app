/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// Third Party
import { getCookie } from "@/helper";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
  responseType: "json",
});

function setAuthToken(token = "") {
  axiosInstance.interceptors.request.use(
    function (config) {
      config.headers = config.headers ?? {};
      config.params = config.params || {};
      config.headers.Authorization = token ? `Bearer ${token}` : "";

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}
const methods = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  setAuthToken,
};

axiosInstance.interceptors.request.use(
  function (config) {
    try {
      const token = getCookie("token");
      config.headers = config.headers ?? {};
      config.params = config.params || {};
      config.headers.Authorization = token.token
        ? `Bearer ${token.token}`
        : "";
      return config;
    } catch (error) {
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default methods;