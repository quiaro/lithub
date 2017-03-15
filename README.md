LitHub
=====================

## Setup

To run this project you will first need to [download and install the Google Cloud SDK](https://cloud.google.com/appengine/docs/standard/python/download).

Then, you may follow these 3 simple steps to get this project set up and running locally:

1) Clone the repository
```
$ git clone
```

2) Go to the project directory
```
$ cd
```

3) Launch the [local development server]
```

```

This project uses the CSS language extension Sass, which makes it easier to manage and change the look of the app during development. If you wish to make changes to any of the stylesheets and see the changes applied with every browser refresh, you will need to follow 2 additional steps:

4) Install gulp, gulp-autoprefixer and gulp-sass
```
$ npm install
```

5) Ask gulp to watch for changes to any of the .scss files. On change, [gulp](http://gulpjs.com/) will update the project's stylesheet (`app/static/css/main.css`) and the changes will be reflected when the browser is refreshed (assuming that the local development server from step 3 is up and running).
```
$ gulp
```

---

## License

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a copy of this license, visit [http://creativecommons.org/licenses/by-nc-sa/3.0/](https://creativecommons.org/licenses/by-nc-sa/3.0/) or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
