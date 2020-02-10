import React, {useCallback} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import NumberFormat from "react-number-format";

export const SaveUserDetails = (props) => {
    const {
        roles,
        onChangedInput,
        userDetails,
        classes
    } = props;


    const renderSelect = useCallback(() => {
        return roles.map((role) => {
            return (
                <option key={role.roleId} value={role.roleId}>{role.name}</option>
            )
        });
    }, [roles]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    label={"First Name"}
                    name={"firstName"}
                    variant={"outlined"}
                    type={"text"}
                    value={(userDetails && userDetails.firstName) || ''}
                    onChange={onChangedInput}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label={"Last Name"}
                    name={"lastName"}
                    variant={"outlined"}
                    type={"text"}
                    value={(userDetails && userDetails.lastName) || ''}
                    onChange={onChangedInput}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label={"Middle Name"}
                    name={"middleName"}
                    value={(userDetails && userDetails.middleName) || ''}
                    onChange={onChangedInput}
                    variant={"outlined"}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <NumberFormat
                    customInput={TextField}
                    label={"Contact number"}
                    name={"contactNumber"}
                    type={"tel"}
                    variant={"outlined"}
                    format={"+38 (###) ###-##-##"}
                    mask={"_"}
                    value={(userDetails && userDetails.contactNumber) || ''}
                    onChange={onChangedInput}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    required
                >
                    <InputLabel id="demo-simple-select-outlined-label">
                        Role
                    </InputLabel>
                    <Select
                        native
                        name={"roleId"}
                        value={(userDetails && userDetails.roleId) || ''}
                        onChange={onChangedInput}
                        labelWidth={40}
                        required
                        inputProps={{
                            name: 'roleId',
                        }}>
                        <option value=""></option>
                        {renderSelect()}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}
