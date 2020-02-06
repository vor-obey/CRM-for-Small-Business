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
        label,
        disabled
    } = props;
    return (
        <Autocomplete
            open={isOpen}
            onOpen={onToggle}
            onClose={onClose}
            getOptionLabel={option => option.Description}
            options={options}
            loading={isLoading}
            disabled={disabled}
            onChange={(event, value) => onSelectHandler(value)}
            renderInput={params => (
                <TextField
                    {...params}
                    label={`Choose ${label}`}
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
                          <span key={option.Ref}>
                              {option.DescriptionRu}
                          </span>
                            <Typography variant='body2' color="textSecondary">
                                {option.Description}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
};
