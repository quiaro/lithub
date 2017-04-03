import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import LoginForm from '../../components/forms/Login';
import { saveAuthToken } from '../../common/auth';
import { authenticate } from '../../actions/auth';
import * as apiAuth from '../../api/auth';

class Login extends React.Component {

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
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  /**
   * Dispatch an authenticate action to change the state and mark
   * the user as authenticated.
   */
  authenticateUser() {
    this.props.authenticate();
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
          this.props.authenticate();
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
    return apiAuth.viaLogin({
      email: this.state.user.email,
      password: this.state.user.password
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
    if (this.props.isAuthenticated) {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      return (<Redirect to={from}/>)
    }
    return (<LoginForm onSubmit={this.processForm}
                       onChange={this.changeUser}
                       onSignIn={this.authenticateUser}
                       errors={this.state.errors}
                       user={this.state.user} />);
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated
})

Login = connect(
  mapStateToProps,
  { authenticate }
)(Login)

export default Login;
