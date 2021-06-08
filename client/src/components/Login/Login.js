import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";

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
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    await login({ email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <LoginWrapper type='login'>
      <form onSubmit={handleLogin} autoComplete="off">
        <Grid>
          <FormControl required>
            <TextField
              id="email"
              className={classes.userInput}
              margin="normal"
              name="email"
              type="text"
              label="E-mail address"
              inputProps={{ style: inputStyle }}
              InputLabelProps={{ style: labelStyle }}
            />
          </FormControl>
        </Grid>
        <FormControl required>
          <TextField
            id="password"
            className={classes.userInput}
            name="password"
            type="password"
            label="Password"
            aria-label="password"
            inputProps={{ style: inputStyle }}
            InputLabelProps={{ style: labelStyle }}
          />
        </FormControl>
        <Grid>
          <Button type="submit" className={classes.loginButton} variant="contained" color="primary">
            Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
