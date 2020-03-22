import React, {useCallback} from 'react';
import {FormControl, InputLabel, Select} from '@material-ui/core';
import {ROLES, EOrderStatus} from "../../../constants/statuses";
import {useTranslation} from "react-i18next";

export const ListSelector = ({
                                 classes,
                                 label,
                                 roles,
                                 onChange,
                                 statuses,
                                 value
                             }) => {
    const {t} = useTranslation();

    const renderRoleOptions = useCallback(() => {
        return roles.map((role) => {
            return (
                <option key={role.roleId} value={role.roleId}>{t(ROLES[role.name])}</option>
            )
        });
    }, [roles, t]);

    const renderStatusOptions = useCallback(() => {
        const entries = Object.entries(EOrderStatus);
        return entries.map(([key, value]) => {
            return (
                <option key={key} value={key}>{t(value)}</option>
            )
        });
    }, [t]);

    const renderSelect = useCallback(() => {
        if (roles) {
            return renderRoleOptions();
        }
        if (statuses) {
            return renderStatusOptions();
        }
    }, [roles, statuses, renderRoleOptions, renderStatusOptions]);

    return (
        <FormControl className={classes.selector}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                native
                onChange={onChange}
                value={value}>
                <option value=""/>
                {renderSelect()}
            </Select>
        </FormControl>
    )

};
