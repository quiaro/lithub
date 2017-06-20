import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import GoogleSignin from '../../containers/forms/GoogleSignin'
import FacebookSignin from '../../containers/forms/FacebookSignin'

const LoginForm = ({
  onSubmit,
  onChange,
  onSignIn,
  errors,
  user
}) => (
  <div className="login">
    <Paper className="content" zDepth={2}>
      <h1>Lit Hub Login</h1>

      <form onSubmit={onSubmit}>
        {errors.summary && <p className="error-message">{errors.summary}</p>}

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
            errorText={errors.password}
            onChange={onChange}
            value={user.password}
          />

        <RaisedButton type="submit"
                      label="Log in"
                      primary={true}
                      style={{ marginTop: 15 }} />
      </form>

      <div className="signup">
        <p>Not a member yet? <Link to={'/signup'}>Create an account</Link></p>
      </div>
      <div className="oauth">
        <p>Or authenticate via one of these services:</p>
        <GoogleSignin onSignIn={onSignIn}></GoogleSignin>
        <FacebookSignin onSignIn={onSignIn}></FacebookSignin>
      </div>
    </Paper>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
