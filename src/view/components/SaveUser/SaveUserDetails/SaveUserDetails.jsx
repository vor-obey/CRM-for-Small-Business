import React, {useCallback} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import NumberFormat from "react-number-format";
import {useTranslation} from "react-i18next";
import {ROLES} from "../../../../constants/statuses";

export const SaveUserDetails = ({
                                    roles,
                                    onChangedInput,
                                    userDetails,
                                    classes,
                                    renderRoles = true,
                                }) => {
    const {t} = useTranslation();
    const renderRoleOptions = useCallback(() => {
        return roles.map((role) => {
            return (
                <option key={role.roleId} value={role.roleId}>{t(ROLES[role.name.toUpperCase()])}</option>
            )
        });
    }, [roles, t]);

    const renderRoleSelect = useCallback(() => {
        if (!renderRoles) {
            return null;
        }
        return (
            <Grid item xs={12} sm={6}>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    required
                >
                    <InputLabel id="demo-simple-select-outlined-label">
                        {t('ROLE')}
                    </InputLabel>
                    <Select
                        native
                        name="roleId"
                        value={(userDetails && userDetails.roleId) || ''}
                        onChange={onChangedInput}
                        labelWidth={40}
                        required
                        inputProps={{
                            name: 'roleId',
                        }}>
                        <option value=""/>
                        {renderRoleOptions()}
                    </Select>
                </FormControl>
            </Grid>
        )
    }, [
        classes.formControl,
        onChangedInput,
        renderRoleOptions,
        renderRoles,
        userDetails,
        t
    ]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    label={t('FIRST_NAME')}
                    name="firstName"
                    variant="outlined"
                    type="text"
                    value={(userDetails && userDetails.firstName) || ''}
                    onChange={onChangedInput}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label={t('LAST_NAME')}
                    name="lastName"
                    variant="outlined"
                    type="text"
                    value={(userDetails && userDetails.lastName) || ''}
                    onChange={onChangedInput}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label={t('MIDDLE_NAME')}
                    name="middleName"
                    value={(userDetails && userDetails.middleName) || ''}
                    onChange={onChangedInput}
                    variant="outlined"
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={renderRoles ? 6 : 12}>
                <NumberFormat
                    customInput={TextField}
                    label={t('NUMBER')}
                    name="contactNumber"
                    type="tel"
                    variant="outlined"
                    format="+38 (###) ###-##-##"
                    mask="_"
                    value={(userDetails && userDetails.contactNumber) || ''}
                    onChange={onChangedInput}
                    required
                    fullWidth
                />
            </Grid>
            {renderRoleSelect()}
        </Grid>
    )
};
