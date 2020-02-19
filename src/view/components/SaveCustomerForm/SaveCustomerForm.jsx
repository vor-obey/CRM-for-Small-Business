import React from 'react';
import {Avatar, Button, Container, CssBaseline, Grid, TextField, Typography, makeStyles} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NumberFormat from "react-number-format";
import {saveCustomerStyle} from "./SaveCustomerForm.style";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";


const useStyles = makeStyles(saveCustomerStyle);


export const SaveCustomerForm = (props) => {

    const {
        renderSource,
        titleText,
        submitText,
        details,
        onSubmit,
        onChange
    } = props;

    const classes = useStyles();

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddIcon className={classes.create}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {titleText}
                    </Typography>
                    <form className={classes.form} onSubmit={(event) => onSubmit(event, details)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={"Username"}
                                    name={"username"}
                                    variant={"outlined"}
                                    type={"text"}
                                    value={details.username}
                                    onChange={onChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={"Name"}
                                    name={"name"}
                                    variant={"outlined"}
                                    type={"text"}
                                    value={details.name}
                                    onChange={onChange}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label={"Email Address"}
                                    name={"contactEmail"}
                                    variant={"outlined"}
                                    type="email"
                                    value={details.contactEmail}
                                    onChange={onChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <NumberFormat
                                    customInput={TextField}
                                    label={"Contact number"}
                                    name={"contactNumber"}
                                    type={"tel"}
                                    variant={"outlined"}
                                    format={"+38 (###) ###-##-##"}
                                    mask={"_"}
                                    value={details.contactNumber}
                                    onChange={onChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={"Details"}
                                    name={"details"}
                                    value={details.details}
                                    onChange={onChange}
                                    variant={"outlined"}
                                    required
                                    fullWidth
                                    rows="4"
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.formControl}
                                    required
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Source
                                    </InputLabel>
                                    <Select
                                        native
                                        name={"sourceId"}
                                        value={(details && details.sourceId) || ''}
                                        onChange={onChange}
                                        labelWidth={40}
                                        required
                                        inputProps={{
                                            name: 'sourceId',
                                        }}>
                                        <option value=""></option>
                                        {renderSource()}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            className={classes.submit}
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            fullWidth
                        >{submitText}</Button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

