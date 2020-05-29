import React from 'react';

import {
    Grid,
    ListItem,
    Typography,
} from "@material-ui/core";

import {useTranslation} from 'react-i18next';
import ListItemText from "@material-ui/core/ListItemText";

export const TemplateListItem = ({
                                     template,
                                     classes,
                                     navigationToTemplateDetails
                                 }) => {
    const {t} = useTranslation();

    return (
        <ListItem key={template.templateId} disableGutters divider button
                  onClick={() => navigationToTemplateDetails(template.templateId)}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} className={classes.gridList}>
                    <Typography className={classes.textList}>
                        {t('TEMPLATE_NAME')}:
                    </Typography>
                    <ListItemText primary={template.name}/>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} className={classes.text}>
                    <Typography className={classes.textList}>
                        {t('TEMPLATE_CONTENTS')}:
                    </Typography>
                      <ListItemText className={classes.text} primary={template.content}/>
                </Grid>
            </Grid>
        </ListItem>
    )
};
