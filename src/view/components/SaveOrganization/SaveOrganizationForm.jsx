import React, {useCallback} from "react";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useTranslation} from "react-i18next";

export const SaveOrganizationForm = ({
                                         onChangedInput,
                                         organization,
                                         isEdit
                                     }) => {
    const {t} = useTranslation('');

    const renderCodeInput = useCallback(() => {
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
    }, [isEdit, onChangedInput, organization.codeValue, t]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                    label={t('ORGANIZATION_NAME')}
                    name="name"
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
                    fullWidth
                />
            </Grid>
            {renderCodeInput()}
        </Grid>
    )
};
