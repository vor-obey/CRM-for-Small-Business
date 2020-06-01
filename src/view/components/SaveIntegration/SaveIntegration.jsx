import React from 'react';
import Grid from '@material-ui/core/Grid';
import {TextField} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const integrationTypes = ['instagram'];

export const SaveIntegration = ({
                                    creds,
                                    onChangedHandler
                                }) => {
    return (
        <Grid container item xs={12} sm={12} spacing={1}
              direction='row' wrap='wrap' alignItems='flex-start'
              alignContent='flex-start' justify='center'>
            <Grid item xs={12} sm={12} style={{margin: '10px 0 10px 0'}}>
                <TextField
                    label='Username'
                    name="username"
                    variant="outlined"
                    value={creds.username}
                    onChange={({target: {value}}) => onChangedHandler('username', value)}
                    required
                    fullWidth
                    inputProps={{
                        autoComplete: 'off',
                        type: 'text'
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} style={{margin: '10px 0 10px 0'}}>
                <TextField
                    label='Password'
                    variant="outlined"
                    value={creds.password}
                    onChange={({target: {value}}) => onChangedHandler('password', value)}
                    required
                    fullWidth
                    inputProps={{
                        autoComplete: 'new-password',
                        type: 'password',
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} style={{margin: '10px 0 10px 0'}}>
                <FormControl
                    variant="outlined"
                    fullWidth
                    required
                >
                    <InputLabel id="demo-simple-select-outlined-label">
                        Type
                    </InputLabel>
                    <Select
                        native
                        name="type"
                        value={creds.type}
                        onChange={({target: {value}}) => onChangedHandler('type', value)}
                        labelWidth={40}
                        required
                        inputProps={{
                            name: 'type',
                        }}>
                        <option value=""/>
                        {integrationTypes.map((type, i) => (
                            <option key={i} value={type}>{type}</option>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};