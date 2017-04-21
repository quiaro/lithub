LitHub
=====================

Web app to track the books and articles read by an individual and a community of users as well as quotes favorited by them.

Users can see an overview of the activity of the community without signing in. However, to see the full history of the community and have the ability to contribute, users must first register/sign in.

---

## Features
- Public home page displaying an overview of books and articles read by the community, and quotes favorited by them.
- Authentication and controlled access to resources using [JSON Web Tokens (JWT)](https://jwt.io/introduction/)
- Authentication via [Google Sign-in](https://developers.google.com/identity/sign-in/web/)
- Authentication via [Facebook Login](https://developers.facebook.com/docs/facebook-login/web)
- Keep a personal history of books/articles read with rating and comments for each one.
- Edit/remove items in personal history.
- Keep a personal list of favorite quotes with the possibility to add comments for each one.
- Edit/remove items in favorite quote list.
- View all unread books/articles that have been posted by other members.
- View all ratings/comments by other members for an unread book.
- View all quotes that have been favorited by other members.
- View all comments by other members for a quote that has not yet been favorited.
- Responsive design works on smartphones, tablets and desktops.
- Data available via Open APIs.

---

## Requirements

To run this project, you will first need to have installed:

1. [VirtualBox](https://www.virtualbox.org/wiki/Downloads): a free, cross-platform consumer virtualization product that will be used for running a virtual machine (VM) running Ubuntu Linux.

2. [Vagrant](https://www.vagrantup.com/downloads.html): command line utility for managing the lifecycle of the project's VM.

---

## Setup

To get this project set up and running locally:

1. Clone the repo
```
$ git clone https://github.com/quiaro/lithub.git
```

2. Add/tune secrets module

Copy the folder `/server/secrets-example` and save it as `/server/secrets`. Then, modify the files in the `secrets` folder per the needs of the project.
```
$ cd lithub
$ cp -r /server/secrets-example /server/secrets
/* ---
secrets/secrets.js:
- replace "PRIVATE_SECRET" with a strong password.
- replace "DIGEST_ALGORITHM" with the name of a supported
  digest function (e.g. sha512). An array of supported digest
  functions can be retrieved using crypto.getHashes().
- You may also modify the values of SALT_LENGTH, KEY_LENGTH,
  ITERATIONS or the hashing function altogether (i.e. pbkdf2)
  per the security needs of the project.

secrets/db.js:
- replace "UA_PASSWORD" with a strong password.
  Make sure there are no ampersands in the password.
- replace "DB_PASSWORD" with a strong password.
  Make sure there are no ampersands in the password.
 --- */
```

3. Create, provision and start the VM
```
$ vagrant up
```

4. Access the running VM
```
$ vagrant ssh
```

5. Install all server dependencies
```
$ cd /vagrant/server
$ npm install
```

6. Install all client app dependencies
```
$ cd /vagrant/app
$ npm install
```

7. Start the server. The server will stay running in the terminal window so another terminal window will be necessary to start the client app (next step).
```
$ cd /vagrant/server
$ swagger project start
```

8. Start the client app
```
$ cd /vagrant/app
$ npm start
```

9. Verify setup

Open a browser to `http://localhost:3001/`

---

## Enable 3rd-Party Authentication

To enable 3rd-party authentication, additional steps are required which involve registering the app with the corresponding vendor to authorize usage of their API.

### Enable Authentication via Google Sign In

1. In order to enable Google sign in, [follow these steps](https://developers.google.com/identity/sign-in/web/devconsole-project) to create a Google API Console project and get a client ID, which will be needed to call the sign-in API.

2. Search for "REPLACE_WITH_GOOGLE_ID" in the project, and replace any occurrence of the string with your Google client ID.

3. Download the JSON file corresponding to your project's credentials, which can be downloaded from the **Credentials** tab in the [Google API console](https://console.developers.google.com/projectselector/apis/library).

4. Name the file `gapi_client_secret.json` and add it to the secrets folder (`/server/secrets`) -similarly to how it appears in `/server/secrets-example`.

### Enable Authentication via Facebook Login

1. Get a Facebook App ID from [Facebook's App Dashboard](https://developers.facebook.com/apps/) to use for the project.

2. In order to test the Facebook Login locally, a test app will need to be created as explained in this [post](http://stackoverflow.com/questions/21295872/facebook-app-localhost-no-longer-works-as-app-domain).

3. Search for "REPLACE_WITH_FB_APP_ID" in the project, and replace any occurrence of the string with your Facebook App ID (from step 1) or Test App ID (from step 2).

---

## Testing & Troubleshooting

### Test the database

App data is stored in a MongoDB instance. Since the database has access control enabled, to test the connection and query the database you may access the mongo shell using the database credentials stored in `/server/secrets/db.js`.

1. SSH into the vagrant machine and view the mongo log to check that the mongo daemon is running and accepting connections. By default, whenever `vagrant up` is run, the mongo service will be started.
```
$ vagrant ssh
$ cat /var/log/mongodb/mongod.log
```

2. Access the mongo shell using the database credentials defined in step 2 of the [Setup section](#setup). You may connect to the database on port 27017 from the VM (guest) or on port 27018 from the host. For example, using the default DB configuration, the following commands would be used to gain access to the mongo shell:
```
// Access from the VM (guest)
$ mongo lithub -u lithubAdmin -p DB_PASSWORD

// Access from the host
$ mongo lithub --port 27018 -u lithubAdmin -p DB_PASSWORD
```

### Test the server

Requests can be made to the Open API to test the server directly. The server runs on port 10010; however, to test the server from the host machine, requests must be addressed to port 10011 (which end up being forwarded to port 10010 of the guest machine).

For example, you may test the GET method on the endpoint `/books/latest` with curl by doing:
```
// From the VM (guest)
$ curl http://127.0.0.1:10010/api/books/latest

// From the host (to the guest machine)
$ curl http://127.0.0.1:10011/api/books/latest
```

**View/Test the Open API**

An easier way to test the server and view the documentation for the Open API is by using the swagger editor. To launch the swagger editor:

1. Install swagger as a global package from NPM:
```
npm install -g swagger@0.7.5
```

2. Start the server on the host
```
$ cd <project_root_folder>/server
$ swagger project start
```

3. On another terminal window, launch the swagger editor:
```
$ cd <project_root_folder>/server
$ swagger project edit
```

### Import mock data

To start using the app after installation and test its features, a dump file (`lithub-dump.archive`) is provided to import mock data into the app. To import the mock data into the app, run a `restore` using the credentials defined in step 2 of the [Setup section](#setup). For example, from the project root, the `restore` command using the default DB configuration would be:
```
$ mongorestore -u lithubAdmin -p DB_PASSWORD --authenticationDatabase lithub --drop --nsInclude '*' --archive=setup/db/lithub-dump.archive
```
**Careful: this command will drop all data from the database before the import**

After the `restore` is completed, the credentials of one of the existing users are:
```
email: donramon@elchavo.com
password: donramon
```

---

## Technologies & Support

This project is made up of two separate pieces of software: the client app and the server.

The client app is a Front-End client bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) that employs [Material UI](http://www.material-ui.com/#/) to seek good design principles and a clean user interface. The client app uses [React](https://facebook.github.io/react/) on top of [Redux](http://redux.js.org/) to manage its state.

The server is at its heart a [Swagger](http://swagger.io/) project that manages content in a [MongoDB](https://www.mongodb.com/) database and provides a RESTful interface defined by a set of Open APIs that provide access to both public and protected resources. To access protected resources, the server offers 3 different auth mechanisms (credentials, via Google token, via Facebook token) to grant the user an authentication token needed to access these resources. To authenticate via Google, the server makes use of the [Google Auth Library](https://github.com/google/google-auth-library-nodejs) for NodeJS, which is slightly different than to how authentication it is done via Facebook, where Facebook's [Graph API](https://developers.facebook.com/docs/graph-api) is called directly instead.

This project supports **NodeJS v7.9.0** and **MongoDB v3.4.3** and has been tested on Chrome, Firefox and Safari.

---

## License

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a copy of this license, visit [http://creativecommons.org/licenses/by-nc-sa/3.0/](https://creativecommons.org/licenses/by-nc-sa/3.0/) or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
