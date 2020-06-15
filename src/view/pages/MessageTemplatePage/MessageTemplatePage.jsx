import React, {useCallback, useState} from 'react';
import {
    Grid,
    Button,
    Divider,
    TextField,
    Typography,
    makeStyles,
    ListItem, IconButton
} from "@material-ui/core";

import isEmpty from "lodash/isEmpty";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import {
    closeDialog,
    closeModal,
    renderDialog,
    renderModal,
    setIsLoading,
    setSnackBarStatus
} from "../../../data/store/auxiliary/auxiliaryActions";

import {useDispatch} from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import {templatePageStyles} from "./MessageTemplatePage.style";
import TemplateService from "../../../services/TemplateService";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {useTemplates} from "../../../utils/hooks/templatesHooks";
import {CreateMessageTemplate} from "../CreateMessageTemplate/CreateMessageTemplate";

const useStyles = makeStyles(templatePageStyles);

export const MessageTemplatePage = ({chat, onSubmit, isDialogOpen, handleDrawerIcon}) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [editName, setEditName] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editId, setEditId] = useState('');
    const [templateIds, setTemplateIds] = useState([]);
    const {templatesList, loading, fetchTemplates} = useTemplates();

    const showMore = useCallback((template) => {
        const id = templateIds.find((id) => id === template.templateId);
        if (!id) {
            setTemplateIds([...templateIds, template.templateId]);
        }
    }, [templateIds]);

    const hide = useCallback((template) => {
        const newArr = [...templateIds];
        const ind = newArr.findIndex((id) => id === template.templateId);
        newArr.splice(ind, 1);
        setTemplateIds(newArr);
    }, [templateIds]);

    const onChangeName = useCallback((value) => {
        setEditName(value);
    }, []);

    const onChangeContent = useCallback((value) => {
        setEditContent(value);
    }, []);

    const onCancelChanges = useCallback((template) => {
        setEditName(template.name);
        setEditContent(template.content);
        setEditId('');
    }, []);

    const saveHandleClick = useCallback(async (event) => {
        if (editId) {
            event.preventDefault();
            try {
                dispatch(setIsLoading(true));
                const response = await TemplateService.update({
                    name: editName,
                    content: editContent,
                    templateId: editId
                });
                if (response.success) {
                    dispatch(setIsLoading(false));
                    await fetchTemplates();
                    setEditId('');
                } else {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                }
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        }
    }, [editId, editContent, fetchTemplates, editName, dispatch]);

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
                await fetchTemplates();
                dispatch(setIsLoading(false));
                dispatch(closeDialog());
            } else {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [dispatch, fetchTemplates]);

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

    const handleClick = useCallback((template) => {
        if (chat) {
            onSubmit(template.content);
            handleDrawerIcon();
        }
    }, [chat, onSubmit, handleDrawerIcon]);

    const renderName = useCallback((template) => {
        if (editId === template.templateId) {
            return (
                <Grid className={classes.gridName}>
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
                </Grid>
            );
        }
        return (
            <Grid className={classes.templateTitle}
                  onClick={() => handleClick(template)}>
                <Typography color='primary' variant='body1' className={classes.templateTitleName}>
                    {template.name}
                </Typography>
            </Grid>
        );
    }, [editId, classes, onChangeName, editName, handleClick]);

    const handleClickSubmit = useCallback((template) => {
        if (isDialogOpen) {
            handleDrawerIcon();
            onSubmit(template.content);
        }
    }, [isDialogOpen, handleDrawerIcon, onSubmit]);

    const renderContent = useCallback((template) => {
        const id = templateIds.find((id) => id === template.templateId);
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
        } else {
            if (id) {
                return (
                    <Grid className={classes.gridLess}>
                        <Typography className={classes.readLessText}>{template.content}</Typography>
                        <Typography onClick={() => hide(template)} className={classes.buttonText}
                                    color='primary'>{t('HIDE')}</Typography>
                    </Grid>
                );
            } else {
                return (
                    <Grid className={classes.gridMore}>
                        {template.content.length > 300 ?
                            <Grid onClick={() => showMore(template)} className={classes.display}>
                                <Typography className={classes.readMoreText}>{template.content}</Typography>
                                <Typography className={classes.buttonText} color='primary'>
                                    {t('SHOW_MORE')}
                                </Typography>
                            </Grid>
                            : <Typography className={classes.readMoreText}>{template.content}</Typography>}
                    </Grid>
                );
            }
        }
    }, [classes, editContent, editId, templateIds, hide, showMore, onChangeContent, t]);

    const renderChatContent = useCallback((template) => {
        const id = templateIds.find((id) => id === template.templateId);
        if (id) {
            return (
                <Grid>
                    <Typography color='primary'>{template.name}</Typography>
                    <Typography onClick={() => handleClickSubmit(template)}
                                className={classes.readLessText}>{template.content}
                    </Typography>
                    <Typography onClick={() => hide(template)} className={classes.buttonText}
                                color='primary'>{t('HIDE_ALL')}</Typography>
                    <Divider/>
                </Grid>
            );
        } else {
            return (
                <Grid style={{width: '100%'}}>
                    <Typography color='primary'>{template.name}</Typography>
                    {template.content.length > 30 ?
                        <div onClick={() => showMore(template)} className={classes.display}>
                            <Typography onClick={() => handleClickSubmit(template)}
                                        className={classes.readMoreText}>{template.content}</Typography>
                            <Typography className={classes.buttonText}
                                        color='primary'>{t('SHOW_MORE')}</Typography>
                        </div>
                        : <Typography onClick={() => handleClickSubmit(template)}
                                      className={classes.readMoreText}>{template.content}</Typography>}
                    <Divider/>
                </Grid>
            );
        }
    }, [templateIds, handleClickSubmit, classes, t, showMore, hide]);

    const renderButton = useCallback((template) => {
        if (editId === template.templateId) {
            return (
                <Grid>
                    <IconButton onClick={event => saveHandleClick(event)}>
                        <CheckIcon/>
                    </IconButton>
                    <IconButton onClick={() => onCancelChanges(template)}>
                        <CloseIcon/>
                    </IconButton>
                </Grid>
            );
        } else {
            return (
                <Grid>
                    <IconButton onClick={() => editHandler(template)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => openTemplateDeleteDialog(template)}>
                        <DeleteIcon/>
                    </IconButton>
                </Grid>
            );
        }
    }, [editHandler, onCancelChanges, openTemplateDeleteDialog, editId, saveHandleClick]);

    const renderRows = useCallback(() => {
        if (isEmpty(templatesList)) {
            return null;
        }
        return templatesList.map((template) => {
            const {templateId} = template;
            if (!templateId.length) {
                return null;
            }
            if (chat) {
                return (
                    <ListItem key={templateId} style={{width: '96%'}}>
                        {renderChatContent(template)}
                    </ListItem>
                );
            } else {
                return (
                    <ListItem key={templateId} className={classes.templateList}>
                        <Grid container item xs={12} sm={12} className={classes.templateContainer}>
                            <Grid item xs={12} sm={12} className={classes.templateInfo}>
                                <Grid container item xs={12} sm={12} className={classes.templateContainerName}>
                                    {renderName(template)}
                                    <Grid className={classes.display}>
                                        {renderButton(template)}
                                    </Grid>
                                </Grid>
                                <Divider/>
                            </Grid>
                            {renderContent(template)}
                        </Grid>
                    </ListItem>
                );
            }
        });
    }, [templatesList, classes, renderContent, renderChatContent, renderName, chat, renderButton]);

    const handleClickAction = useCallback(() => {
        if (chat) {
            dispatch(renderModal({
                isOpen: true,
                children: (
                    <CreateMessageTemplate handleDrawerIcon={handleDrawerIcon} onSubmit={onSubmit} chat={chat}
                                           isDialogOpen={isDialogOpen}/>
                ),
                onCloseHandler: () => dispatch(closeModal()),
                allowBackDropClick: true
            }))
        } else {
            history.push('/create-message-template')
        }
    }, [chat, dispatch, onSubmit, isDialogOpen, handleDrawerIcon, history]);

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
                        onClick={handleClickAction}
                        className={classes.button}
                    >
                        {t('CREATE')}
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid>
            <Grid className={chat ? classes.containerChat : classes.container}>
                <Grid style={{width: chat ? '100%' : null}} className={classes.root}>
                    {renderRows()}
                </Grid>
            </Grid>
            <Grid container justify='center' className={classes.button}>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    onClick={handleClickAction}
                >
                    {t('CREATE_MESSAGE_TEMPLATE')}
                </Button>
            </Grid>
        </Grid>
    );
};
