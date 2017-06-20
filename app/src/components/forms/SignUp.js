import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import GoogleSignin from '../../containers/forms/GoogleSignin'
import FacebookSignin from '../../containers/forms/FacebookSignin'

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="sign-up">
    <Paper className="content">
      <h1>Lit Hub Sign Up</h1>
      <form action="/" onSubmit={onSubmit}>

        {errors.summary && <p className="error-message">{errors.summary}</p>}

          <TextField
            floatingLabelText="Username"
            fullWidth={true}
            name="username"
            errorText={errors.username}
            onChange={onChange}
            value={user.username}
          />

          <TextField
            floatingLabelText="Name"
            fullWidth={true}
            name="name"
            errorText={errors.name}
            onChange={onChange}
            value={user.name}
          />

          <TextField
            floatingLabelText="Email"
            fullWidth={true}
            name="email"
            errorText={errors.email}
            onChange={onChange}
            value={user.email}
          />

          <TextField
            floatingLabelText="Password"
            fullWidth={true}
            type="password"
            name="password"
            onChange={onChange}
            errorText={errors.password}
            value={user.password}
          />

          <RaisedButton type="submit"
                        label="Create New Account"
                        primary={true}
                        style={{ marginTop: 15 }} />
      </form>

      <div className="login-link">
        <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
      </div>
      <div className="oauth">
        <p>Or sign in with an external service:</p>
        <GoogleSignin></GoogleSignin>
        <FacebookSignin></FacebookSignin>
      </div>
    </Paper>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
