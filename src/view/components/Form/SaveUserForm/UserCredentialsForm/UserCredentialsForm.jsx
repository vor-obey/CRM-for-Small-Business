import React from 'react';
import {FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@material-ui/core";
import Visibility from "@material-ui/core/SvgIcon/SvgIcon";

export const UserCredentials = (props) => {

    return (
        <>
            <Grid item xs={12}>
                <TextField
                    label={"Email Address"}
                    name={"email"}
                    variant={"outlined"}
                    type="email"
                    value={userCredentials.email}
                    onChange={onChangeHandler}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        label={"Password"}
                        name={"password"}
                        type={showPassword ? 'text' : 'password'}
                        value={userCredentials.password}
                        onChange={onChangeHandler}
                        labelWidth={85}
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    size='small'
                                    edge='end'>
                                    {showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password" >Repeat Password </InputLabel>
                    <OutlinedInput
                        label={"Password"}
                        name={"confirmPassword"}
                        placeholder={"Repeat Password *"}
                        type={showPassword ? 'text' : 'password'}
                        value={userCredentials.confirmPassword}
                        onChange={onChangeHandler}
                        labelWidth={145}
                        required
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end" >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    size='small'
                                    edge='end'>
                                    {showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
        </>
    )
};
