import React from 'react';
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useTranslation} from "react-i18next";

export const SaveUserCredentials = ({
                                        onChangedInput,
                                        credentials,
                                        showPassword,
                                        toggleShowPassword
                                    }) => {
    const { t } = useTranslation('');
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label={t('EMAIL')}
                    name="email"
                    variant="outlined"
                    type="email"
                    value={credentials.email}
                    onChange={onChangedInput}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl variant="outlined" required fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">{t('PASSWORD')}</InputLabel>
                    <OutlinedInput
                        label={t('PASSWORD')}
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.password}
                        onChange={onChangedInput}
                        labelWidth={110}
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleShowPassword}
                                    size='small'
                                    edge='end'>
                                    {showPassword ?
                                        <Visibility fontSize='small'/>
                                        : <VisibilityOff fontSize='small'/>
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl variant="outlined" required fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">{t('REPEAT_PASSWORD')}</InputLabel>
                    <OutlinedInput
                        label={t('REPEAT_PASSWORD')}
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.confirmPassword}
                        onChange={onChangedInput}
                        labelWidth={150}
                        required
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleShowPassword}
                                    size='small'
                                    edge='end'>
                                    {showPassword ? <Visibility fontSize='small'/> : <VisibilityOff fontSize='small'/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
};
