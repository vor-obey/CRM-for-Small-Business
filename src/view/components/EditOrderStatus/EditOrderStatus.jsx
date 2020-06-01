import React, {useCallback, useEffect, useState} from "react";
import {
    FormControl,
    Select,
    InputLabel,
    makeStyles
} from "@material-ui/core";
import {EOrderStatus} from "../../../constants/statuses";
import {editOrderStatusStyles} from "./EditOrderStatus.style";
import {useTranslation} from "react-i18next";

const useStyle = makeStyles(editOrderStatusStyles);

export function EditOrderStatus({
                                    status,
                                    submit
                                }) {
    const [currentStatus, setCurrentStatus] = useState(status);
    const classes = useStyle();
    const {t} = useTranslation('');

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    const onStatusSelectHandler = useCallback((value) => {
        submit(value);
    }, [submit]);

    const renderStatuses = useCallback(() => {
        const entries = Object.entries(EOrderStatus);
        return entries.map(([key, value]) => {
            return <option key={key} value={key}>{t(value)}</option>
        });
    }, [t]);

    return (
            <FormControl variant="filled" size={"small"} margin={'none'}>
                <InputLabel>{t('STATUS')}</InputLabel>
                <Select
                    label={t('STATUS')}
                    classes={{
                        disabled: classes.selectStatusDisabled,
                        filled: classes.selectStatusFilled,
                    }}
                    native
                    name="status"
                    value={currentStatus}
                    onChange={(event) => onStatusSelectHandler(event.target.value)}
                    inputProps={{
                        name: 'status',
                    }}>
                    {renderStatuses()}
                </Select>
            </FormControl>
    )
}
