import React, {useCallback} from 'react';
import {useHistory} from "react-router-dom";
import {SaveMessageTemplateForm} from "../../components/SaveMessageTemplateForm/SaveMessageTemplateForm";
import {useTranslation} from "react-i18next";
import TemplateService from "../../../services/TemplateService";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {useDispatch} from "react-redux";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

export const CreateMessageTemplate = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmitHandler = useCallback(async (event, details) => {
        event.preventDefault();
        if (!details.name.trim().length || !details.content.trim().length) {
            return null;
        } else {
            try {
                dispatch(setIsLoading(true));
                const response = await TemplateService.create({
                    name: details.name,
                    content: details.content
                });
                if (response.success) {
                    dispatch(setIsLoading(false));
                    history.push('/message-templates');
                } else {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                }
            } catch {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        }
    }, [dispatch, history]);

    return <SaveMessageTemplateForm
        labels={{
            button: t('CREATE'),
            title: t('CREATE_MESSAGE_TEMPLATE')
        }}
        onSubmit={onSubmitHandler}
    />
};
