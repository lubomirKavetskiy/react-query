import { User } from '../../../shared/types';

const USER_LOCALSTORAGE_KEY = 'lazyday_user';

// helper to get user from localstorage
export function getStoredUser(): User | null {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user: User): void {
  alert(2);
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}
