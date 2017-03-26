import React from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import LoginForm from '../../components/forms/Login';
import { saveAuthToken } from '../../common/utils';

class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action i.e. the form submission event
    event.preventDefault();

    let validatedForm = this.validateLogin(this.state.user);

    if (validatedForm.isValid) {
      // proceed with submission
      this.submitForm()
        .then(token => {
          // If the credentials are valid, a JWT is returned
          saveAuthToken(token)

          // Any error messages that were present are cleared before redirecting
          // the user
          this.setState({
            errors: {}
          });
          console.log('Redirect to app dashboard');
        })
        .catch(errors => {
          this.setState({
            errors
          });
        })
    } else {
      this.setState({errors: validatedForm.errors})
    }
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value.trim();

    this.setState({user});
  }

  /**
   * Submit the form to be processed by the server
   */
  submitForm() {
    return new Promise((resolve, reject) => {
      const email = encodeURIComponent(this.state.user.email);
      const password = encodeURIComponent(this.state.user.password);
      const formData = `email=${email}&password=${password}`;
      const xhr = new XMLHttpRequest();

      xhr.open('post', '/api/auth/login');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(xhr.response.token)
        } else {
          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          reject(errors)
        }
      });
      xhr.send(formData);
    });
  }

  /**
   * Validate a user's information
   *
   * @param {object} user - User's credentials
   * @return {object}
   */
  validateLogin(user) {
    const errors = {};
    let isFormValid = true;

    if (isEmpty(user.email)) {
      errors.email = 'Please provide your email address';
    } else {
      if (!isEmail(user.email)) {
        errors.email = 'Please provide a valid email address';
      }
    }

    if (isEmpty(user.password)) {
      errors.password = 'Please provide your password';
    }

    if (errors.email || errors.password) {
      isFormValid = false;
      errors.summary = 'Unable to submit form. Please check the form for errors.';
    }

    return {isValid: isFormValid, errors};
  }

  /**
   * Render the component.
   */
  render() {
    return (<LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user}/>);
  }

}

export default LoginPage;
