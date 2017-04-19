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

2. Create, provision and start the VM
```
$ cd lithub
$ vagrant up
```

3. Access the running VM
```
$ vagrant ssh
```

4. Install all server dependencies
```
$ cd /vagrant/server
$ npm install
```

5. Install all client dependencies
```
$ cd /vagrant/app
$ npm install
```

6. Start the server
```
$ cd /vagrant/server
$ swagger project start
```

7. Start the client app
```
$ cd /vagrant/app
$ npm start
```

8. Verify setup
Open a browser to `http://localhost:3000/`

---

## Technologies & Support

This project is made up of two separate pieces of software: the client app and the server.

The client app is a Front-End client bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) that employs [Material UI](http://www.material-ui.com/#/) to seek good design principles and a clean user interface. The client app uses [React](https://facebook.github.io/react/) on top of [Redux](http://redux.js.org/) to manage its state.

The server is at its heart a [Swagger](http://swagger.io/) project that manages content in a [MongoDB](https://www.mongodb.com/) database and provides a RESTful interface defined by a set of Open APIs that provide access to both public and protected resources. To access protected resources, the server offers 3 different auth mechanisms (credentials, via Google token, via Facebook token) to grant the user an authentication token needed to access these resources. To authenticate via Google, the server makes use of the [Google Auth Library](https://github.com/google/google-auth-library-nodejs) for NodeJS, which is slightly different than to how authentication it is done via Facebook, where Facebook's [Graph API](https://developers.facebook.com/docs/graph-api) is called directly instead.

This project supports **NodeJS v7.9.0** and **MongoDB v3.4.3** and has been tested on Chrome, Firefox and Safari.

---

## License

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a copy of this license, visit [http://creativecommons.org/licenses/by-nc-sa/3.0/](https://creativecommons.org/licenses/by-nc-sa/3.0/) or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
