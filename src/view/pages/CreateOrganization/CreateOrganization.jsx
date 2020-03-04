import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {OrganizationService} from "../../../services";
import {Avatar, Button, Container, CssBaseline, Typography} from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import {makeStyles} from "@material-ui/core/styles";
import {saveOrganizationStyle} from "../../components/SaveOrganization/SaveOrganizationStyle";
import {SaveOrganizationForm} from "../../components/SaveOrganization/SaveOrganizationForm";
import {SaveUserDetails} from "../../components/SaveUser/SaveUserDetails/SaveUserDetails";
import {SaveUserCredentials} from "../../components/SaveUser/SaveUserCredentials/SaveUserCredentials";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(saveOrganizationStyle);

export const CreateOrganization = (props) => {

    const {history} = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [organization, setOrganization] = useState({
        organizationName: '',
        apiKeyNP: '',
        codeValue: '',
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);


    const onSubmitHandler = useCallback(async (event) => {
        event.preventDefault();
        const {confirmPassword, ...org} = organization;

        try {
            dispatch(setIsLoading(true));
            const response = await OrganizationService.create(org);
            if (response && response.success) {
                dispatch(setIsLoading(false));
                history.push('/');
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, organization, history]);


    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        setOrganization(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }, []);


    const handleClickShowPassword = useCallback(() => {
        setShowPassword(prevState => !prevState)
    }, []);


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <BusinessIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Organization
                </Typography>
                <form className={classes.form} onSubmit={onSubmitHandler}>
                    <SaveOrganizationForm
                        organization={organization}
                        onChangedInput={onChangeHandler}
                    />
                    <Typography className={classes.user} component="h1" variant="h6">
                        Create User
                    </Typography>
                    <SaveUserDetails
                        userDetails={organization}
                        onChangedInput={onChangeHandler}
                        classes={classes}
                        setRoleRender={true}
                        setFieldSize={12}
                    />
                    <Grid item xs={12} sm={12} className={classes.cred}>
                        <SaveUserCredentials
                            credentials={organization}
                            showPassword={showPassword}
                            toggleShowPassword={handleClickShowPassword}
                            onChangedInput={onChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            className={classes.submit}
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            fullWidth
                        >Accept</Button>
                    </Grid>
                </form>
            </div>
        </Container>
    )
};