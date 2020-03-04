import React, {useCallback, useState} from "react";
import {Avatar, Container, CssBaseline, TextField, Typography, makeStyles, Button, Grid} from "@material-ui/core";
import {saveOrganizationStyle} from "../../components/SaveOrganization/SaveOrganizationStyle";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {CodeService} from "../../../services";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {useDispatch} from "react-redux";


const useStyles = makeStyles(saveOrganizationStyle);

export const CreateCode = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [code, setCode] = useState('');

    const onChangeHandler = useCallback((event) => {
        const {value} = event.target;
        setCode(value)
    }, []);

    const onSubmitHandler = useCallback(async (event) => {
        event.preventDefault();
        try {
            dispatch(setIsLoading(true));
            const response = await CodeService.create({code});
            if (response && response.success === undefined) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({
                    isOpen: true,
                    message: `Congratulations! Your code ${code} was created!`,
                    success: true
                }))
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}))
            }
        } catch {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, code]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeyIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Code
                </Typography>
                <form className={classes.form} onSubmit={onSubmitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label={'Enter your code'}
                                name={"code"}
                                variant={"outlined"}
                                type={"text"}
                                value={code || ''}
                                onChange={onChangeHandler}
                                required
                                fullWidth
                            />
                            <Button
                                className={classes.submit}
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                fullWidth
                            >Send code</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
};