import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";

import useStyles from './style.js';
import LoginWrapper from './LoginWrapper';

const inputStyle = {
  margin: '25px 0 5.8px 5px'
}
const labelStyle = {
  margin: '0 5px'
}

const Login = (props) => {
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <LoginWrapper type='signUp'>
      <form onSubmit={handleRegister} autoComplete="off">
        <Grid>
          <FormControl required>
            <TextField
              className={classes.userInput}
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              required
              inputProps={{ style: inputStyle }}
              InputLabelProps={{ style: labelStyle }}
            />
          </FormControl>
        </Grid>
        <FormControl required>
          <TextField
            className={classes.userInput}
            aria-label="e-mail address"
            label="E-mail address"
            name="email"
            type="email"
            required
            inputProps={{ style: inputStyle }}
            InputLabelProps={{ style: labelStyle }}
          />
        </FormControl>
        <FormControl error={!!formErrorMessage.confirmPassword}>
          <TextField
            className={classes.userInput}
            aria-label="password"
            label="Password"
            name="password"
            type="password"
            required
            inputProps={{ minLength: 6, style: inputStyle }}
            InputLabelProps={{ style: labelStyle }}
          />
          <FormHelperText>
            {formErrorMessage.confirmPassword}
          </FormHelperText>
        </FormControl>
        <FormControl error={!!formErrorMessage.confirmPassword}>
          <TextField
            className={classes.userInput}
            aria-label="confirm password"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            inputProps={{ minLength: 6, style: inputStyle }}
            InputLabelProps={{ style: labelStyle }}
          />
          <FormHelperText>
            {formErrorMessage.confirmPassword}
          </FormHelperText>
        </FormControl>
        <Grid>
          <Button type="submit" className={classes.loginButton} variant="contained" color="primary">
            Create
              </Button>
        </Grid>
      </form>
    </LoginWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
