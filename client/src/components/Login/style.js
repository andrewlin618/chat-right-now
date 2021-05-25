import { makeStyles } from "@material-ui/core/styles";
import backgroundImg from '../../assets/images/bg-img.png';

const useStyles = makeStyles((theme) => ({
    leftPage: {
        width: '41.5vw',
        height: '100vh',
        textAlign: 'center',
        background: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    leftPageFilter: {
        height: '100%',
        background: 'linear-gradient(rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85))',
    },
    slogan: {
        fontSize: '26px',
        color: '#ffffff',
        margin: '39px 0 20vh 0'
    },
    rightPage: {
        width: '55vw',
        [theme.breakpoints.down('sm')]: {
            width: '100vw'
        },
    },
    topBar: {
        width: '100%',
        height: '16.3vh',
        justifyContent: "flex-start",
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
        },
    },
    topBarText: {
        color: '#b0b0b0',
        margin: '0 30px 0 calc(9.7vw + 109px)',
        [theme.breakpoints.down('sm')]: {
            margin: '0 80px'
        },
    },
    topBarButton: {
        height: '54px',
        color: '#3A8DFF',
        boxShadow: '0 2px 12px 0 rgba(74, 106, 149, 0.2)',
    },
    formContainer: {
        margin: '8.6vh 0 0 9.7vw',
        padding: 0,
        maxWidth: '380px',
        [theme.breakpoints.down('sm')]: {
            margin: 'auto',
            textAlign: 'center'
        },
    },
    formTitle: {
        fontSize: '26px',
        color: '#000000',
        fontWeight: '600'
    },
    userInput: {
        width: 'clamp(200px, 70vw, 380px)',
        margin: '2px 0'
    },
    loginButton: {
        color: 'white',
        width: '160px',
        height: '56px',
        margin: '60px 0 0 110px',
        [theme.breakpoints.down('sm')]: {
            margin: ' 30px auto'
        },
    }
}));

export default useStyles;