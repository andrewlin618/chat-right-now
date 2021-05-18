import React from "react";
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
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

import Bubble from "./components/Bubble.js";
import useStyles from './style.js';


const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
            <Typography className={classes.topBarText}>Don't have an account?</Typography>
          </Grid>
          <Grid item>
            <Button className={classes.topBarButton} onClick={() => history.push("/register")}>Creat account</Button>
          </Grid>
        </Grid>
        <Container className={classes.formContainer}>
          <Typography className={classes.formTitle}>Welcome Back!</Typography>
          <form onSubmit={handleLogin} autoComplete="off">
            <Grid>
              <FormControl required>
                <TextField
                  id="username"
                  className={classes.userInput}
                  margin="normal"
                  name="username"
                  type="text"
                  label="E-mail address"
                  inputProps={{ style: { margin: '25px 0 5.8px 5px' } }} // font size of input text
                  InputLabelProps={{ style: { margin: '0 5px' } }} // font size of input label
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
                inputProps={{ style: { margin: '25px 0 5.8px 5px' } }} // font size of input text
                InputLabelProps={{ style: { margin: '0 5px' } }} // font size of input label
              />
            </FormControl>
            <Grid>
              <Button type="submit" className={classes.loginButton} variant="contained" color="primary">
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
