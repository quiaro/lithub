const USER_KEY = 'user';

/**
 * Store the user's JWT
 *
 * @param {object} token - Jason Web Token
 */
export const saveCurrentUser = (token) => {
  sessionStorage.setItem(USER_KEY, JSON.stringify(token));
}

/**
 * Get the user's JWT
 *
 * @return {string} token - Jason Web Token
 */
export const getCurrentUser = () => {
  const user = sessionStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : undefined;
}

/**
 * Remove the user's JWT
 */
export const clearCurrentUser = () => sessionStorage.removeItem(USER_KEY);
