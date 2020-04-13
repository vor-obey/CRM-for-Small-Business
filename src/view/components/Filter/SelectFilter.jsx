import React, {useCallback} from 'react';
import {FormControl, InputLabel, Select} from '@material-ui/core';
import {ROLES, EOrderStatus} from "../../../constants/statuses";
import {useTranslation} from "react-i18next";

export const SelectFilter = ({
                                 classes,
                                 label,
                                 roles = null,
                                 onChange,
                                 value,
                             }) => {
    const {t} = useTranslation();

    const renderOptions = useCallback(() => {
        if (roles) {
            return roles.map((role) => {
                return (
                    <option key={role.roleId} value={role.roleId}>{t(ROLES[role.name.toUpperCase()])}</option>
                )
            });
        }

        return Object.entries(EOrderStatus).map(([key, value]) => {
            return (
                <option key={key} value={key}>{t(value)}</option>
            )
        });
    }, [roles, t]);

    return (
        <FormControl className={classes.selector}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                native
                onChange={onChange}
                value={value}>
                <option value=""/>
                {renderOptions()}
            </Select>
        </FormControl>
    )

};
