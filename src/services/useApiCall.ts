/* eslint-disable */
import { handleLogout } from "@/helper";
interface ErrorResponse {
  response: {
    status: number;
  };
}

export const useApiCall = () => {
  const call = async (
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void,
    onError?: (err?: any) => void
  ) => {
    try {
      const response = await apiCall();

      if (!response) {
        handleLogout(false, true);
        return;
      }
      const { status } = response;
      switch (status) {
        case 200:
        case 201:
        case 202:
          onSuccess(response);
          break;
        case 402:
        case 401:
        case 400:
          if (onError) onError();
        default:
          if (onError) onError();
          break;
      }
    } catch (err: ErrorResponse | any) {
      const { response } = err;
      switch (response?.status) {
        case 401:
          if (onError) onError(err);
          handleLogout(false, true);
        default:
          if (onError) onError(err);
          break;
      }
    }
  };

  return { call };
};