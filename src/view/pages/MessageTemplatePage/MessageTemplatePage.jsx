import React, {useCallback, useState} from 'react';
import {
    Grid,
    Button,
    Divider,
    TextField,
    Typography,
    makeStyles,
    ListItem, IconButton, useMediaQuery
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useTemplates} from "../../../utils/hooks/templatesHooks";
import isEmpty from "lodash/isEmpty";
import {templatePageStyles} from "./MessageTemplatePage.style";
import EditIcon from "@material-ui/icons/Edit";
import ReadMoreAndLess from 'react-read-more-less';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";
import {
    closeDialog,
    renderDialog,
    setIsLoading,
    setSnackBarStatus
} from "../../../data/store/auxiliary/auxiliaryActions";
import TemplateService from "../../../services/TemplateService";
import {useDispatch} from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(templatePageStyles);

export const MessageTemplatePage = ({chat, onSubmit}) => {
        const {t} = useTranslation();
        const classes = useStyles();
        const dispatch = useDispatch();
        const [, updateState] = useState();
        const [editName, setEditName] = useState();
        const [editContent, setEditContent] = useState();
        const [templatesList, , loading] = useTemplates();
        const [editId, setEditId] = useState('');
        const minWidth600 = useMediaQuery('(min-width:900px)');
        const forceUpdate = useCallback(() => updateState({}), []);

        const onChangeName = useCallback((value) => {
            setEditName(value);
        }, []);

        const onChangeContent = useCallback((value) => {
            setEditContent(value);
        }, []);

        const deleteChange = useCallback((template) => {
            setEditName(template.name);
            setEditContent(template.content);
            setEditId('');
        }, []);

        const saveHandleClick = useCallback(async (event, template) => {
            if (editId) {
                event.preventDefault();
                try {
                    dispatch(setIsLoading(true));
                    await TemplateService.update({
                        name: editName,
                        content: editContent,
                        templateId: editId
                    });
                    dispatch(setIsLoading(false));
                    const ind = templatesList.findIndex(({templateId}) => templateId === editId);
                    template.name = editName;
                    template.content = editContent;
                    templatesList[ind] = {
                        ...template
                    };
                    setEditId('');
                } catch (e) {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
                }
            } else {
                return null;
            }
        }, [editId, templatesList, editContent, editName, dispatch]);

        const editHandler = useCallback((template) => {
            setEditId(template.templateId);
            setEditName(template.name);
            setEditContent(template.content);
        }, []);

        const deleteTemplate = useCallback(async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await TemplateService.delete(id);
                if (response.success) {
                    dispatch(setIsLoading(false));
                    dispatch(closeDialog());
                    const indexToDelete = templatesList.findIndex(({templateId}) => templateId === id);
                    templatesList.splice(indexToDelete, 1);
                } else {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
                }
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
            forceUpdate();
        }, [dispatch, forceUpdate, templatesList]);

        const openTemplateDeleteDialog = useCallback((template) => {
            dispatch(renderDialog({
                isShow: true,
                onCloseHandler: () => dispatch(closeDialog()),
                closeText: t('DISAGREE'),
                children: `${t('DELETE_MESSAGE_TEMPLATE')} "${template.name}"?`,
                actionText: t('AGREE'),
                onActionHandler: () => deleteTemplate(template.templateId),
            }));
        }, [dispatch, deleteTemplate, t]);

        const renderName = useCallback((template) => {
            if (editId === template.templateId) {
                return (
                    <div className={classes.divName}>
                        <TextField
                            className={classes.inputName}
                            variant='standard'
                            inputProps={{
                                maxLength: 30,
                            }}
                            style={{width: editName.length * 9}}
                            value={editName}
                            onChange={(event) => onChangeName(event.target.value)}
                        />
                    </div>
                );
            }
            return (
                <div className={!chat ? classes.templateTitle : classes.templateTitleWithCursor}
                     onClick={() => chat ? onSubmit(template.content) : null}>
                    <Typography variant='body1' className={classes.templateTitleName}>
                        {template.name}
                    </Typography>
                </div>
            );
        }, [editId, classes, onChangeName, editName, onSubmit, chat]);

        const renderContent = useCallback((template) => {
            if (editId === template.templateId) {
                return (
                    <Grid item xs={12}>
                        <TextField
                            name="content"
                            value={editContent}
                            onChange={event => onChangeContent(event.target.value)} variant='outlined' fullWidth required
                            multiline/>
                    </Grid>
                );
            }
            if (minWidth600 === false || chat === true) {
                return (
                    <Grid item xs={12}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{t('TEMPLATE_CONTENTS')}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography className={classes.break}>
                                    {template.content}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                );
            } else {
                return (
                    <div className={classes.templateTitle}>
                        <div className={classes.templateTitleName}>
                            <ReadMoreAndLess
                                className="read-more-content"
                                charLimit={1500}
                                readMoreText={t('READ_MORE')}
                                readLessText={t('HIDE_TEXT')}
                            >
                                {template.content}
                            </ReadMoreAndLess>
                        </div>
                    </div>
                );
            }
        }, [classes, editContent, editId, minWidth600, chat, onChangeContent, t]);

        const renderButton = useCallback((template) => {
            if (editId === template.templateId) {
                return (
                    <div>
                        <IconButton onClick={event => saveHandleClick(event, template)}>
                            <CheckIcon/>
                        </IconButton>
                        <IconButton onClick={() => deleteChange(template)}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                );
            } else {
                return (
                    <div>
                        <IconButton onClick={() => editHandler(template)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => openTemplateDeleteDialog(template)}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                );
            }
        }, [editHandler, deleteChange, openTemplateDeleteDialog, editId, saveHandleClick]);

        const renderRows = useCallback(() => {
            if (isEmpty(templatesList)) {
                return null;
            }
            return templatesList.map((template) => {
                const {templateId} = template;
                if (!templateId.length) {
                    return null;
                }
                return (
                    <ListItem key={templateId} className={classes.templateList}>
                        <Grid container item xs={12} sm={12} className={classes.templateContainer}>
                            <Grid item xs={12} sm={12} className={classes.templateInfo}>
                                <Grid container item xs={12} sm={12} className={classes.templateContainerName}>
                                    {renderName(template)}
                                    {!chat ?
                                        <div className={classes.display}>
                                            {renderButton(template)}
                                        </div> : null}
                                </Grid>
                                <Divider/>
                            </Grid>
                            {renderContent(template)}
                        </Grid>
                    </ListItem>
                );
            });
        }, [templatesList, classes, renderContent, renderName, chat, renderButton]);

        if (isEmpty(templatesList) && !loading) {
            return (
                <Grid
                    container
                    item
                    spacing={0}
                    className={classes.noContent}
                >
                    <Grid container justify='center' className={classes.justifyContainerButton}>
                        <Typography variant='h5' className={classes.noNewText}>{t('NO_NEW_TEMPLATE_MESSAGE')}</Typography>
                        <Button
                            type='submit'
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            component={Link}
                            to='/create-message-template'
                        >
                            {t('CREATE')}
                        </Button>
                    </Grid>
                </Grid>
            )
        }

        return (
            <div>
                <div className={classes.container}>
                    <div className={classes.root}>
                        {renderRows()}
                    </div>
                </div>
                <Grid container justify='center' className={!chat ? classes.buttonContainer : classes.none}>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to='/create-message-template'
                    >
                        {t('CREATE_MESSAGE_TEMPLATE')}
                    </Button>
                </Grid>
            </div>
        );
    }
;
