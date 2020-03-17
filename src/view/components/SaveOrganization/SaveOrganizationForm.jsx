import React from "react";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export const SaveOrganizationForm = ({
                                         onChangedInput,
                                         organization
                                     }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                    label="Organization Name"
                    name="organizationName"
                    variant="outlined"
                    type="text"
                    onChange={onChangedInput}
                    value={organization.organizationName}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    label="Nova Poshta API Key"
                    name="apiKeyNP"
                    variant="outlined"
                    type="text"
                    onChange={onChangedInput}
                    value={organization.apiKeyNP}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    label="Code"
                    name="codeValue"
                    variant="outlined"
                    onChange={onChangedInput}
                    value={organization.codeValue}
                    required
                    fullWidth
                />
            </Grid>
        </Grid>
    )
};