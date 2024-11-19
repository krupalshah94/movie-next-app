/* eslint-disable */
import { redirect } from "next/navigation";

export function setCookie(name: string, value: string, expiryMinutes: number) {
  const date = new Date();
  date.setTime(date.getTime() + expiryMinutes * 60 * 1000);
  let expiry = "expires=" + date.toUTCString();
  document.cookie = `__${name}` + "=" + value + ";" + expiry + `;path=/`;
}

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

export const deleteCookie = (name: string) => {
  if (typeof document !== "undefined") {
    document.cookie = `__${name}=; Max-Age=0; path=/;`;
  }
};

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
