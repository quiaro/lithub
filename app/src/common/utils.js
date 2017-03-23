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
