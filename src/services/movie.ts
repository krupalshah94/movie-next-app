/* eslint-disable */
import http from "@/services/index";

// Constant
import { API_ENDPOINTS } from "@/constants";

const { MOVIES } = API_ENDPOINTS;

/**
 * Fetches a list of movies from the API.
 * @param {number} [page=1] - The page number to fetch.
 * @returns {Promise<any>} - The response from the API.
 */
export const getMovies = async (page = 1) => {
  try {
    const res = await http.get(`${MOVIES.GET}?page=${page}`);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Fetches a movie by its ID from the API.
 * @param {string} id - The movie ID to fetch.
 * @returns {Promise<any>} - The response from the API.
 */
export const getMovie = async (id: string) => {
  try {
    const res = await http.get(`${MOVIES.GET_BY_ID}/${id}`);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Creates a movie on the API.
 * @param {object} data - The movie data to create.
 * @returns {Promise<any>} - The response from the API.
 */
export const createMovie = async (data: any) => {
  try {
    const res = await http.post(MOVIES.CREATE, data);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Updates a movie on the API.
 * @param {string} id - The movie ID to update.
 * @param {object} data - The movie data to update.
 * @returns {Promise<any>} - The response from the API.
 */
export const updateMovie = async (id: string, data: any) => {
  try {
    const res = await http.put(`${MOVIES.UPDATE}/${id}`, data);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Uploads an image to the API.
 * @param {object} data - The image data to upload.
 * @returns {Promise<any>} - The response from the API.
 */
export const uploadImage = async (data: any) => {
  try {
    const res = await http.post(MOVIES.UPLOAD_IMAGE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error: any) {
    return error.response;
  }
};
