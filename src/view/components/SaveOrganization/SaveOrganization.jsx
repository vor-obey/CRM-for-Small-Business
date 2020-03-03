import React, {useState} from 'react';
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

const useStyles = makeStyles(saveOrganizationStyle);

export const SaveOrganization = (props) => {

    const {
        title,
        organization
    } = props;
    const classes = useStyles();

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
                        organization={organization}
                    />
                </form>

            </div>
        </Container>
    )
};