import React from "react";
import {Autocomplete} from "@material-ui/lab";
import {CircularProgress, TextField, Popper} from "@material-ui/core";

export const CustomAutocomplete = ({
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

    const PopperMy = function (props) {
        return (<Popper {...props} style={{marginBottom: 9}} placement='bottom-start' />)
    }

    return (
        <Autocomplete
            open={isOpen}
            onOpen={onToggle}
            onClose={onClose}
            options={options}
            loading={isLoading}
            getOptionLabel={getOptionLabel}
            disabled={disabled}
            onChange={(event, value) => onSelectHandler(value)}
            value={value}
            PopperComponent={PopperMy}
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
