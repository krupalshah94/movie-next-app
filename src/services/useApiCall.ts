/* eslint-disable */
import { handleLogout } from "@/helper";
interface ErrorResponse {
  response: {
    status: number;
  };
}

/**
 * Custom hook for making API calls with error handling and logout logic.
 *
 * @returns {object} - An object containing the `call` function.
 * 
 * The `call` function is used to make an API request.
 * @param {Function} apiCall - A function that returns a promise for the API call.
 * @param {Function} onSuccess - A callback function to be invoked when the API call is successful.
 * @param {Function} [onError] - An optional callback function to be invoked when the API call fails.
 * 
 * The `call` function handles different HTTP response statuses:
 * - On 200, 201, 202: invokes `onSuccess` with the response.
 * - On 400, 401, 402: invokes `onError` if provided, and performs logout.
 * - On other errors: invokes `onError` if provided.
 *
 * If the API call results in no response or a 401 error, it triggers a logout.
 */
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
          handleLogout(false, true);
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
