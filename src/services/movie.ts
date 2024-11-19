/* eslint-disable */
import http from "@/services/index";

// Constant
import { API_ENDPOINTS } from "@/constants";

const { MOVIES } = API_ENDPOINTS;

export const getMovies = async (page = 1) => {
  try {
    const res = await http.get(`${MOVIES.GET}?page=${page}`);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const getMovie = async (id: string) => {
  try {
    const res = await http.get(`${MOVIES.GET_BY_ID}/${id}`);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const createMovie = async (data: any) => {
  try {
    const res = await http.post(MOVIES.CREATE, data);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const updateMovie = async (id: string, data: any) => {
  try {
    const res = await http.put(`${MOVIES.UPDATE}/${id}`, data);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

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
