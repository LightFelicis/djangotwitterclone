import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignInPage from "./SignInPage";
import LoginPage from "./LoginPage";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LandingPage() {
    const [accountExists, setAccountExists] = useState(true);
    const classes = useStyles();
    const landingPageForm = accountExists ? <LoginPage/> : <SignInPage/>;

    return (
        <Container component="main" maxWidth="xs">
            {landingPageForm}
             <Grid container   justify="center"
                   alignItems="center">
                <Grid item xs="6">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {setAccountExists(!accountExists);}}
                    >
                        {accountExists ? "Nie masz konta?" : "Masz już konto?"}
                    </Button>
                </Grid>
             </Grid>
        </Container>
    );
}