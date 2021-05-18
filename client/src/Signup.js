import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import Bubble from "./components/Bubble.js";
import useStyles from './style.js';

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
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
    <Grid container component="main" className={classes.root}>
      <Grid item className={classes.leftPage} display='none'>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.leftPageFilter}>
          <Bubble className={classes.bubble} />
          <Typography className={classes.slogan}>Converse with anyone<br /> with any language</Typography>
        </Box>
      </Grid>
      <Grid item className={classes.rightPage}>
        <Grid container className={classes.topBar} alignItems="center">
          <Grid item>
            <Typography className={classes.topBarText}>Already have an account?</Typography>
          </Grid>
          <Grid item>
            <Button className={classes.topBarButton} onClick={() => history.push("/login")}>Login</Button>
          </Grid>
        </Grid>
        <Container className={classes.formContainer}>
          <Typography className={classes.formTitle}>Create an account.</Typography>
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
                  inputProps={{ style: { margin: '25px 0 5.8px 5px' } }} // font size of input text
                  InputLabelProps={{ style: { margin: '0 5px' } }} // font size of input label
                />
              </FormControl>
            </Grid>
            <FormControl required>
              <TextField
                className={classes.userInput}
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
                inputProps={{ style: { margin: '25px 0 5.8px 5px' } }} // font size of input text
                InputLabelProps={{ style: { margin: '0 5px' } }} // font size of input label
              />
            </FormControl>
            <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  className={classes.userInput}
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  inputProps={{ style: { margin: '25px 0 5.8px 5px' } }} // font size of input text
                  InputLabelProps={{ style: { margin: '0 5px' } }} // font size of input label
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  className={classes.userInput}
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                  inputProps={{ style: { margin: '18px 0 5.8px 5px' } }} // font size of input text
                  InputLabelProps={{ style: { margin: '0 5px' } }} // font size of input label
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
        </Container>
      </Grid>
    </Grid>
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
