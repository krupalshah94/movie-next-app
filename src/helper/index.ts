/* eslint-disable */
import { redirect } from "next/navigation";

/**
 * Sets a cookie with the specified name, value, and expiration time.
 * 
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value to be stored in the cookie.
 * @param {number} expiryMinutes - The number of minutes until the cookie expires.
 */
export function setCookie(name: string, value: string, expiryMinutes: number) {
  const date = new Date();
  date.setTime(date.getTime() + expiryMinutes * 60 * 1000);
  let expiry = "expires=" + date.toUTCString();
  document.cookie = `__${name}` + "=" + value + ";" + expiry + `;path=/`;
}

/**
 * Retrieves the value of a cookie by name.
 *
 * @param {string} name - The name of the cookie.
 * @returns {Record<string, any> | null} - The value of the cookie, or null if the cookie does not exist.
 */
export function getCookie(name: string) {
  const nameEQ = `__${name}` + "=";

  if (typeof document && typeof window !== "undefined") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return JSON.parse(cookie.substring(nameEQ.length, cookie.length));
      }
    }
  }
  return null;
}

/**
 * Deletes the cookie with the given name.
 * @param {string} name - The name of the cookie to delete.
 */
export const deleteCookie = (name: string) => {
  if (typeof document !== "undefined") {
    document.cookie = `__${name}=; Max-Age=0; path=/;`;
  }
};

/**
 * Updates the value of an existing cookie with new data. If the cookie does not exist,
 * no action is taken. The updated cookie is set with the specified expiration time.
 *
 * @param {string} name - The name of the cookie to update.
 * @param {Record<string, any>} newValue - The new data to merge into the existing cookie value.
 * @param {number} expiryMinutes - The number of minutes until the updated cookie expires.
 */
export const updateCookieValue = (
  name: string,
  newValue: Record<string, any>,
  expiryMinutes: number
) => {
  const existingCookieValue = getCookie(name);
  if (existingCookieValue !== null) {
    const updatedValue = { ...existingCookieValue, ...newValue };
    setCookie(name, JSON.stringify(updatedValue), expiryMinutes);
  } else {
  }
};

/**
 * Logs the user out by deleting the token cookie.
 *
 * If `reload` is `true`, the page is reloaded after the cookie is deleted.
 *
 * If `redirected` is `true`, the user is redirected to the root if they are no
 * longer logged in.
 *
 * @param {boolean} reload - Whether to reload the page after logout.
 * @param {boolean} redirected - Whether to redirect to the root if not logged in.
 */
export const handleLogout = (
  reload: boolean = false,
  redirected: boolean = false
) => {
  deleteCookie("token");

  if (reload) {
    window.location.reload();
  }

  if (redirected) {
    const token = getCookie("token");
    if (!token) {
      redirect("/");
    }
  }
};
