// Per: https://gist.github.com/hagenburger/500716
export const loadScript = (src, id, callback) => {
  var script = document.createElement('script'),
    loaded;
  script.setAttribute('src', src);
  if (id) {
    script.setAttribute('id', id);
  }
  if (callback) {
    script.onreadystatechange = script.onload = () => {
      if (!loaded) {
        callback();
      }
      loaded = true;
    };
  }
  document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * Mock the delay of a server response
 *
 * @param {integer} ms - Delay in milliseconds
 */
export const serverDelay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Extract the value for a query param found in the url search string
 * @param {string} urlSearch - url search string
 * @param {string} param - param searched for
 */
export const getQueryParam = (urlSearch, param) => {
  // Append an ampersand so it's easier to look for the param with a regex
  const str = urlSearch + "&";
  const paramRe = new RegExp(`${param}=(.*?)&`);
  const match = paramRe.exec(str);
  return match && decodeURIComponent(match[1]);
}

export const ratingScale = {
  1: 'Awful',
  2: 'Bad',
  3: 'Okay',
  4: 'Good',
  5: 'Excellent'
}
