import React from "react";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";

export const SaveOrganizationForm = ({
                                         onChangedInput,
                                         organization,
                                         isEdit
                                     }) => {
    const {t} = useTranslation('');

    const renderCodeInput = () => {
        if (isEdit) {
            return null;
        }

        return (
            <Grid item xs={12} sm={12}>
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
        );


    };

    const renderInstagramIntegration = () => {
        return (
            <Grid item xs={12} sm={12}>
                <Typography>
                    Instagram integration
                </Typography>
                <Grid item xs={12} sm={12}>
                <TextField
                    label='Instagram username'
                    name="codeValue"
                    variant="outlined"
                    type='text'
                    onChange={onChangedInput}
                    value={organization.integrations[0].username || ''}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12} sm={12}>
                <TextField
                    label='Password'
                    name="codeValue"
                    variant="outlined"
                    type='password'
                    onChange={onChangedInput}
                    // value={organization.integrations[0].password || ''}
                    fullWidth
                />
                </Grid>
            </Grid>
        )

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                    label={t('ORGANIZATION_NAME')}
                    name="organizationName"
                    variant="outlined"
                    type="text"
                    onChange={onChangedInput}
                    value={organization.name || ''}
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
                    value={organization.apiKeyNP || ''}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12}>
            {renderInstagramIntegration()}
            </Grid>
            {renderCodeInput()}
        </Grid>
    )
};
