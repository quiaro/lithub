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
