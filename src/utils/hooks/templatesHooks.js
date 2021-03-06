import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setSnackBarStatus} from "../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../constants/statuses";
import templateService from "../../services/TemplateService";

export const useTemplates = () => {
    const [templatesList, setTemplatesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchTemplates = useCallback(async () => {
            try {
                setLoading(true);
                const response = await templateService.list();
                setTemplatesList(response);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
    }, [dispatch]);

    useEffect(() => {
      fetchTemplates();
    }, [fetchTemplates]);

    return {templatesList, setTemplatesList, loading, fetchTemplates};
};

