/**
 * Store the user's JWT
 *
 * @param {object} token - Jason Web Token
 */
export const saveAuthToken = (token) => {
  sessionStorage.setItem('lthToken', token);
}

/**
 * Get the user's JWT
 *
 * @return {string} token - Jason Web Token
 */
export const getAuthToken = () => sessionStorage.getItem('lthToken');
