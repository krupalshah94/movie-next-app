/* eslint-disable */
import http from "@/services/index";

// Constant
import { API_ENDPOINTS } from "@/constants";

const { AUTH } = API_ENDPOINTS;

export const login = async (email: string, password: string) => {
    try {
        const res = await http.post(AUTH.LOGIN, {
            email,
            password
        });
        return res;
    } catch (error: any) {
        return error.response;
    }
};

export const signup = async (username: string, email: string, password: string) => {
    try {
        const res = await http.post(AUTH.SIGNUP, {
            username,
            email,
            password
        });
        return res;
    } catch (error: any) {
        return error.response;
    }
};