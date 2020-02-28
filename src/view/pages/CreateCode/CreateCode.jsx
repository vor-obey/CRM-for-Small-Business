import React, {useCallback, useState} from "react";
import {Avatar, Container, CssBaseline, TextField, Typography, makeStyles, Button} from "@material-ui/core";
import {saveOrganizationStyle} from "../../components/SaveOrganization/SaveOrganizationStyle";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Grid from "@material-ui/core/Grid";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_CODE_SUCCESS} from "../../../constants/statuses";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(saveOrganizationStyle);

export const CreateCode = (props) => {

    const dispatch = useDispatch();
    const [code, setCode] = useState({});

    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        setCode(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }, []);

    const onSubmitHandler = useCallback(async (event) => {
        event.preventDefault();
        try {
            dispatch(setIsLoading(true));
            // await OrgService.create(code);
            dispatch(setIsLoading(false));
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_CODE_SUCCESS}))
        }
    }, [dispatch]);

    const classes = useStyles();

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