import React from 'react';
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
    makeStyles,
    InputLabel
} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {saveCustomerStyle} from "./SaveCustomerForm.style";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(saveCustomerStyle);

export const SaveCustomerForm = ({
                                     renderSource,
                                     titleText,
                                     submitText,
                                     details,
                                     onSubmit,
                                     onChange,
                                     selectedCustomer,
                                 }) => {
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
                            <Typography className={classes.typographySources}>
                                {t('SOURCES')}
                            </Typography>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                                required
                            >
                                <Select
                                    native
                                    name="sourceId"
                                    value={(details && details.sourceId) || ''}
                                    onChange={onChange}
                                    required
                                    inputProps={{
                                        name: 'sourceId',
                                    }}
                                >
                                    <option value=''/>
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
                                    value={(details && details.username) || (selectedCustomer && selectedCustomer.username) || ''}
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
                                    value={(details && details.name) || (selectedCustomer && selectedCustomer.full_name) || ''}
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
                                    value={(details && details.contactEmail) || ''}
                                    onChange={onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={t('NUMBER')}
                                    name="contactNumber"
                                    type="tel"
                                    variant="outlined"
                                    value={(details && details.contactNumber) || ''}
                                    onChange={onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={t('DETAILS')}
                                    name="details"
                                    value={(details && details.details) || ''}
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

