import React, {useCallback} from 'react';
import {Button, Container, Grid, makeStyles} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {logOutStyle} from "./LogOut.style";

const useStyles = makeStyles(logOutStyle);

export default function LogOut() {
    const classes = useStyles();
    const {t} = useTranslation('');

    const onClickHandler = useCallback(() => {
        let token = localStorage.getItem("acc");

        if (token) {
            return localStorage.removeItem("acc");
        }
    }, []);

    return (
        <Container component="main">
            <Grid className={classes.root}>
                <Grid className={classes.container}>
                    <Grid className={classes.textBar}>
                        {t('LOGOUT_TEXT')}
                    </Grid>
                    <Grid className={classes.buttonBar}>
                        <Button
                            className={classes.button}
                            href='/'
                            onClick={onClickHandler}
                            color="primary"
                            variant="outlined"
                        >
                            {t('LOGOUT_BUTTON')}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
