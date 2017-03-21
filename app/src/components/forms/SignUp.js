import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

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

        <RaisedButton type="submit" label="Create New Account" primary />

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
