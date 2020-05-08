import React, {useCallback, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {SaveIntegration} from '../SaveIntegration/SaveIntegration';

export const EditIntegration = ({
                                    integration,
                                    onSubmit
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
        <Container maxWidth='sm'>
            <Grid container style={{marginTop: 40}}>
                <SaveIntegration
                    creds={creds}
                    onChangedHandler={onChangedHandler}
                />
                <Grid item xs={12} style={{margin: '15px 0 15px 0'}}>
                    <Button
                        variant='outlined'
                        onClick={() => onSubmit(creds)}
                    >
                        Edit
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};