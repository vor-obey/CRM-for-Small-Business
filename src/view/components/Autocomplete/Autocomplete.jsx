import React from "react";
import {Autocomplete} from "@material-ui/lab";
import {CircularProgress, TextField} from "@material-ui/core";

export const CustomAutocomplete = ({
                                       classes,
                                       isOpen,
                                       options,
                                       onClose,
                                       onToggle,
                                       disabled,
                                       renderOption,
                                       isLoading,
                                       inputLabel,
                                       getOptionLabel,
                                       onSelectHandler,
                                       onInputChangedHandler,
                                       value
                                   }) => {


    return (
        <Autocomplete
            classes={classes}
            open={isOpen}
            onOpen={onToggle}
            onClose={onClose}
            options={options}
            loading={isLoading}
            getOptionLabel={getOptionLabel}
            disabled={disabled}
            onChange={(event, value) => onSelectHandler(value)}
            value={value}
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
            renderOption={renderOption}
        />
    );
};
