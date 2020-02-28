import React, {useCallback, useEffect, useState} from 'react';
import {SaveOrganizationForm} from "./SaveOrganizationForm";
import {
    Avatar,
    Container,
    CssBaseline,
    Typography,
    makeStyles
} from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import {saveOrganizationStyle} from "./SaveOrganizationStyle";
import {SaveUserForm} from "../SaveUser/SaveUserForm";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {RoleService} from "../../../services";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {applyMiddleware as dispatch} from "redux";

const useStyles = makeStyles(saveOrganizationStyle);

export const SaveOrganization = (props) => {

    const {title} = props;
    const classes = useStyles();
    const [organization, setOrganization] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                dispatch(setIsLoading(true));
                const roles = await RoleService.list();
                setRoles(roles);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
            }
        };
        fetchRoles();
    }, [dispatch]);

    const onChangedInput = (event) => {
        console.log(event)
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <BusinessIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <form className={classes.form}>
                    <SaveOrganizationForm
                        onChange={onChangedInput}
                        organization
                    />
                </form>
                <SaveUserForm
                    title="Create User"
                    buttonText="Create"
                    roles={roles}

                />
            </div>
        </Container>
    )
};