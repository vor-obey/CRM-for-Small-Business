import React, {useCallback, useEffect, useState} from 'react';
import {Grid, TextField, makeStyles, Container, CssBaseline, Typography, Button} from "@material-ui/core";
import {saveMessageTemplateStyle} from "./SaveMessageTemplateForm.style";
import isEmpty from 'lodash/isEmpty';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(saveMessageTemplateStyle);

export const SaveMessageTemplateForm = ({
                                            labels,
                                            onSubmit,
                                            templateDetails
                                        }) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const [details, setDetails] = useState({
       name: '',
       content: ''
    });
    useEffect(() => {
        if (!isEmpty(templateDetails)) {
            setDetails({
                name: templateDetails.name,
                content: templateDetails.content
            })
        }
    }, [templateDetails]);

    const onChange = useCallback((event) => {
        const {name, value} = event.target;
        setDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }, []);

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        {labels.title}
                    </Typography>
                    <form className={classes.form} onSubmit={(event) => onSubmit(event, details)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label={t('TEMPLATE_NAME')}
                                    name="name"
                                    value={details.name}
                                    variant="outlined"
                                    type="text"
                                    onChange={onChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={t('TEMPLATE_CONTENTS')}
                                    name="content"
                                    value={details.content}
                                    onChange={onChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    rows="19"
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
                        >{labels.button}</Button>
                    </form>
                </div>
            </Container>
        </div>
    );
};
