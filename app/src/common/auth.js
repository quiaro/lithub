const TOKEN_KEY = 'lthToken';

/**
 * Store the user's JWT
 *
 * @param {object} token - Jason Web Token
 */
export const saveAuthToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
}

/**
 * Get the user's JWT
 *
 * @return {string} token - Jason Web Token
 */
export const getAuthToken = () => sessionStorage.getItem(TOKEN_KEY);

/**
 * Remove the user's JWT
 */
export const clearAuthToken = () => sessionStorage.removeItem(TOKEN_KEY);
