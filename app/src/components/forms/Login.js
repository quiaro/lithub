import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import GoogleSignin from '../../containers/forms/GoogleSignin'
import FacebookSignin from '../../containers/forms/FacebookSignin'

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <Card className="container">
    <form onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

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

      <RaisedButton type="submit" label="Log in" primary />
    </form>

    <CardText>
      <p>Don't have an account?</p>
      <Link to={'/signup'}>Create one</Link>
      <GoogleSignin></GoogleSignin>
      <FacebookSignin></FacebookSignin>
    </CardText>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
