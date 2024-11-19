/* eslint-disable */
import http from "@/services/index";

// Constant
import { API_ENDPOINTS } from "@/constants";

const { AUTH } = API_ENDPOINTS;

/**
 * Logs a user in.
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<AxiosResponse>} - The response from the API
 */
export const login = async (email: string, password: string) => {
  try {
    const res = await http.post(AUTH.LOGIN, {
      email,
      password,
    });
    return res;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Signs up a user.
 * @param {string} username - The user's username
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<AxiosResponse>} - The response from the API
 */
export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await http.post(AUTH.SIGNUP, {
      username,
      email,
      password,
    });
    return res;
  } catch (error: any) {
    return error.response;
  }
};
