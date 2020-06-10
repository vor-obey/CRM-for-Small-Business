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
import {useHistory} from "react-router-dom";
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
    closeModal,
    renderDialog,
    renderModal,
    setIsLoading,
    setSnackBarStatus
} from "../../../data/store/auxiliary/auxiliaryActions";
import TemplateService from "../../../services/TemplateService";
import {useDispatch} from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {CreateMessageTemplate} from "../CreateMessageTemplate/CreateMessageTemplate";

const useStyles = makeStyles(templatePageStyles);

export const MessageTemplatePage = ({chat, onSubmit, isDialogOpen, handleDrawerIcon}) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [editName, setEditName] = useState();
    const [editContent, setEditContent] = useState();
    const {templatesList, loading, fetchTemplates} = useTemplates();
    const [editId, setEditId] = useState('');
    const minWidth600 = useMediaQuery('(min-width:900px)');
    const history = useHistory();
    const [templateArrayId, setTemplateArrayId] = useState([]);

    const showMore = useCallback((template) => {
        if (!templateArrayId.find(({id}) => id === template.templateId)) {
            setTemplateArrayId([...templateArrayId, {id: template.templateId}]);
        }
    }, [templateArrayId]);

    const hideAll = useCallback((template) => {
        const newArr = [...templateArrayId];
        const ind = newArr.findIndex(({id}) => id === template.templateId)
        newArr.splice(ind, 1);
        setTemplateArrayId(newArr);
    }, [templateArrayId]);

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
        } else {
            return null;
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
                 onClick={() => handleClick(template)}>
                <Typography variant='body1' className={classes.templateTitleName}>
                    {template.name}
                </Typography>
            </div>
        );
    }, [editId, classes, onChangeName, editName, handleClick, chat]);

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
        if (minWidth600 === false) {
            return (
                <Grid item xs={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{t('CONTENT')}</Typography>
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
    }, [classes, editContent, editId, minWidth600, onChangeContent, t]);

    const handleClickSubmit = useCallback((template) => {
        if (isDialogOpen) {
            handleDrawerIcon();
            onSubmit(template.content);
        }
    }, [isDialogOpen, handleDrawerIcon, onSubmit]);

    const renderChatContent = useCallback((template) => {
         if (templateArrayId.find(({id}) => id === template.templateId)) {
             return (
                 <Grid>
                     <Typography color='primary'>{template.name}</Typography>
                     <Typography onClick={() => handleClickSubmit(template)}
                                 className={classes.readLessText}>{template.content}
                     </Typography>
                     <Typography onClick={() => hideAll(template)} className={classes.buttonText}
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
                             <Typography className={classes.readMoreText}>{template.content}</Typography>
                             <Typography className={classes.buttonText}
                                         color='primary'>{t('SHOW_MORE')}</Typography>
                         </div>
                         : <Typography className={classes.readMoreText}>{template.content}</Typography>}
                     <Divider/>
                 </Grid>
             );
         }
    }, [templateArrayId, handleClickSubmit, classes, t, showMore, hideAll]);

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
            if (chat) {
                return (
                    <ListItem key={templateId} style={{width: '100%'}}>
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
                                    <div className={classes.display}>
                                        {renderButton(template)}
                                    </div>
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
        <div>
            <div className={chat ? classes.containerChat : classes.container}>
                <div style={{width: chat ? '100%' : null}} className={classes.root}>
                    {renderRows()}
                </div>
            </div>
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
        </div>
    );
};
