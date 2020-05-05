import React, {useCallback, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {SaveIntegration} from '../SaveIntegration/SaveIntegration';

export const CreateIntegration = ({
                                      onSubmit
                                  }) => {
    const [creds, setCreds] = useState({
        username: '',
        password: '',
        type: ''
    });

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
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};