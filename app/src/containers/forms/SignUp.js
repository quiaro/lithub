import React from 'react';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import matches from 'validator/lib/matches';
import SignUpForm from '../../components/forms/SignUp';
import * as apiAuth from '../../api/auth';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        name: '',
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = (field !== 'name') ?
                    event.target.value.trim() : event.target.value;
    this.setState({ user });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    let validatedForm = this.validateSignUp(this.state.user);

    if (validatedForm.isValid) {
      // proceed with submission
      this.submitForm()
        .then(userProfile => {
          this.setState({
            errors: {}
          });
          // TODO: Present success notification to user
          console.log('New user registered: ', userProfile);
        })
        .catch(errors => {
          this.setState({
            errors
          });
        })
    } else {
      this.setState({ errors: validatedForm.errors })
    }
  }

  /**
   * Submit the form to be processed by the server
   */
  submitForm() {
    return apiAuth.signUp({
      username: this.state.user.username,
      email: this.state.user.email,
      password: this.state.user.password,
      name: this.state.user.name
    })
  }

  /**
   * Validate a user's information
   *
   * @param {object} user - User information for signing up
   * @return {object}
   */
  validateSignUp(user) {
    const errors = {};
    let isFormValid = true;

    if (isEmpty(user.username)) {
      errors.username = 'Please provide a username';
    } else {
      if (!isAlphanumeric(user.username)) {
        errors.username = 'Only letters and numbers are accepted in the username';
      }
    }

    if (user.name && !matches(user.name, /^[A-Za-z\u0080-\u00FF ]+$/)) {
      errors.name = 'Please use only letters and spaces';
    }

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

    if (errors.username || errors.name || errors.email || errors.password) {
      isFormValid = false;
      errors.summary = 'Unable to submit form. Please check the form for errors.';
    }

    return {isValid: isFormValid, errors};
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default SignUpPage;
