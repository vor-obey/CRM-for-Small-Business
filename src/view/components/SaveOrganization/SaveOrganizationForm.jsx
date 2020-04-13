import React from "react";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useTranslation} from "react-i18next";

export const SaveOrganizationForm = ({
                                         onChangedInput,
                                         organization,
                                         classes
                                     }) => {
    const { t } = useTranslation('');

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                    label={t('ORGANIZATION_NAME')}
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
                    label={t('NP_API')}
                    name="apiKeyNP"
                    variant="outlined"
                    type="text"
                    onChange={onChangedInput}
                    value={organization.apiKeyNP}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12} className={organization.organizationName ? classes.code: null}>
                <TextField
                    label={t('CODE')}
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
