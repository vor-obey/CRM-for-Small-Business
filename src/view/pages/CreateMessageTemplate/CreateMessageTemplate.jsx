import React, {useCallback} from 'react';
import {useHistory} from "react-router-dom";
import {SaveMessageTemplateForm} from "../../components/SaveMessageTemplateForm/SaveMessageTemplateForm";
import {useTranslation} from "react-i18next";
import TemplateService from "../../../services/TemplateService";
import {closeModal, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {useDispatch} from "react-redux";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {CHAT_TEMPLATES} from "../../../constants/routes";

export const CreateMessageTemplate = ({chat, onSubmit, isDialogOpen, handleDrawerIcon}) => {
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmitHandler = useCallback(async (event, details) => {
        event.preventDefault();
        if (!details.name.trim().length || !details.content.trim().length) {
            return null;
        } else {
            try {
                const response = await TemplateService.create({
                    name: details.name,
                    content: details.content
                });
                if (response.success) {
                    if (chat) {
                        if (isDialogOpen) {
                            onSubmit(details.content);
                        }
                        handleDrawerIcon();
                        dispatch(closeModal())
                    } else {
                        history.push(CHAT_TEMPLATES);
                    }
                } else {
                    dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                }
            } catch {
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        }
    }, [dispatch, chat, onSubmit, isDialogOpen, handleDrawerIcon, history]);

    return <SaveMessageTemplateForm
        labels={{
            button: t('CREATE'),
            title: t('CREATE_MESSAGE_TEMPLATE')
        }}
        onSubmit={onSubmitHandler}
    />
};
