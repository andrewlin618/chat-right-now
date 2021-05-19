import React from 'react';
import { useHistory } from "react-router-dom";
import useStyles from './style.js';
import {
    Grid,
    Container,
    Typography,
    Button
} from "@material-ui/core";
import bubble from "./assets/images/bubble.svg";

const LoginWrapper = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const isLoginPage = props.type === 'login';
    return (
        <Grid container component="main" className={classes.root}>
            <Grid item className={classes.leftPage} display='none'>
                <Grid container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className={classes.leftPageFilter}>
                    <img src={bubble} alt="bubble" />
                    <Typography className={classes.slogan}>Converse with anyone<br /> with any language</Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.rightPage}>
                <Grid container className={classes.topBar} alignItems="center">
                    <Grid item>
                        <Typography
                            className={classes.topBarText}>
                            {isLoginPage ? "Don't have an account?" : "Already have an account?"}</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            className={classes.topBarButton}
                            onClick={() => history.push(isLoginPage ? "/register" : "login")}>
                            {isLoginPage ? "Creat account" : "login"}</Button>
                    </Grid>
                </Grid>
                <Container className={classes.formContainer}>
                    <Typography className={classes.formTitle}>Welcome Back!</Typography>
                    {props.children}
                </Container>
            </Grid>
        </Grid>
    )
}

export default LoginWrapper;