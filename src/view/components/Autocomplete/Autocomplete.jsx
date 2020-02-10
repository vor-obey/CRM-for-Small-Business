import React from "react";
import {Autocomplete} from "@material-ui/lab";
import {CircularProgress, Grid, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const CustomAutocomplete = (props) => {
    const {
        isOpen,
        options,
        isLoading,
        onInputChangedHandler,
        onSelectHandler,
        onToggle,
        onClose,
        inputLabel,
        disabled,
        optionKey,
        primaryText,
        secondaryText
    } = props;
    return (
        <Autocomplete
            open={isOpen}
            onOpen={onToggle}
            onClose={onClose}
            options={options}
            loading={isLoading}
            getOptionLabel={option => option[primaryText]}
            disabled={disabled}
            onChange={(event, value) => onSelectHandler(value)}
            renderInput={params => (
                <TextField
                    {...params}
                    label={inputLabel}
                    fullWidth
                    variant="outlined"
                    onChange={onInputChangedHandler}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        )
                    }}
                />
            )}
            renderOption={option => {
                return (
                    <Grid container alignItems="center">
                        <Grid item xs>
                          <span key={option[optionKey]}>
                              {option[primaryText]}
                          </span>
                            <Typography variant='body2' color="textSecondary">
                                {option[secondaryText]}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
};
