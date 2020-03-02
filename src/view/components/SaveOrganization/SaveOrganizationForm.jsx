import React from "react";
import {Button, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export const SaveOrganizationForm = (props) => {

    const {
        onChangedInput,
        organization
    } = props;


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                    label={"Organization Name"}
                    name={"organizationName"}
                    variant={"outlined"}
                    type={"text"}
                    onChange={onChangedInput}
                    value={(organization && organization.name) || ''}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    label={"Nova Poshta API Key"}
                    name={"apiKeyNP"}
                    variant={"outlined"}
                    value={(organization && organization.apiKeyNP) || ''}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    label={"Auth Code"}
                    name={"authCode"}
                    variant={"outlined"}
                    value={(organization && organization.code) || ''}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <Button
                    type={"submit"}
                    variant={"contained"}
                    color={"primary"}
                    fullWidth
                >Accept</Button>
            </Grid>
        </Grid>
    )
};