import { setToken } from "./token";

export function getStorage(key: string) {
  const value = sessionStorage.getItem(key);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export function setStorage(key: string, value: string) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key: string) {
  setToken(null);
  sessionStorage.removeItem(key);
}
