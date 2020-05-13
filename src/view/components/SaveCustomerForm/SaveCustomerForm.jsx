import React from 'react';
import {Avatar, Button, Container, CssBaseline, Grid, TextField, Typography, makeStyles} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NumberFormat from "react-number-format";
import {saveCustomerStyle} from "./SaveCustomerForm.style";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(saveCustomerStyle);

export const SaveCustomerForm = (props) => {

    const {
        renderSource,
        titleText,
        submitText,
        details,
        onSubmit,
        onChange,
        info,
        modal
    } = props;

    const classes = useStyles();
    const {t} = useTranslation('');

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
                        <Grid item xs={12}>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                                required
                            >
                                <InputLabel>
                                    {t('SOURCES')}
                                </InputLabel>
                                <Select
                                    native
                                    name="sourceId"
                                    value={modal === false ? (details && details.sourceId) || '' : info.sourceId || ''}
                                    onChange={onChange}
                                    labelWidth={70}
                                    required
                                    inputProps={{
                                        name: 'sourceId',
                                    }}>
                                    <option value=""></option>
                                    {renderSource()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label={t('USERNAME')}
                                    name="username"
                                    variant="outlined"
                                    type="text"
                                    value={modal === false ? (details && details.username) || '' : info.username || ''}
                                    onChange={onChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={t('FULL_NAME')}
                                    name="name"
                                    variant="outlined"
                                    type="text"
                                    value={modal === false ? (details && details.name) || '' : info.name || ''}
                                    onChange={onChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={t('EMAIL')}
                                    name="contactEmail"
                                    variant="outlined"
                                    type="email"
                                    value={modal === false ? (details && details.contactEmail) || '' : info.contactEmail || ''}
                                    onChange={onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <NumberFormat
                                    customInput={TextField}
                                    label={t('NUMBER')}
                                    name="contactNumber"
                                    type="tel"
                                    variant="outlined"
                                    mask="_"
                                    value={modal === false ? (details && details.contactNumber) || '' : info.contactNumber || ''}
                                    onChange={onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={t('DETAILS')}
                                    name="details"
                                    value={modal === false ? (details && details.details) || '' : info.details || ''}
                                    onChange={onChange}
                                    variant="outlined"
                                    fullWidth
                                    rows="4"
                                    multiline
                                />
                            </Grid>
                        </Grid>
                        <Button
                            className={classes.submit}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >{submitText}</Button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

