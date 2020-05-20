import React, {useCallback, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {SaveIntegration} from '../SaveIntegration/SaveIntegration';
import Typography from "@material-ui/core/Typography";

export const EditIntegration = ({
                                    integration,
                                    onSubmit,
                                    labels,
                                    classes
                                }) => {
    const [creds, setCreds] = useState({
        username: '',
        password: '',
        type: ''
    });

    useEffect(() => {
        if (integration) {
            const {username, type} = integration;
            setCreds({username, type, password: ''});
        }
    }, [integration]);

    const onChangedHandler = useCallback((event) => {
        const {name, value} = event.target;
        setCreds(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }, []);

    return (
        <Container maxWidth='xs'>
            <Grid container style={{marginTop: 20}}>
                <Typography variant="subtitle1" style={{marginBottom: 20}}>
                    {labels.title}
                </Typography>
                <SaveIntegration
                    creds={creds}
                    onChangedHandler={onChangedHandler}
                />
                <Grid container item xs={12} className={classes.buttonContainer}>
                    <Button
                        className={classes.button}
                        variant='outlined'
                        onClick={() => onSubmit(creds)}
                    >
                        {labels.actionButton}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};