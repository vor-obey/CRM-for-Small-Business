import React, {useCallback} from 'react';
import {FormControl, InputLabel, Select} from '@material-ui/core';
import {ROLES} from "../../../constants/statuses";
import {useTranslation} from "react-i18next";

export const ListSelector = ({
                                 classes,
                                 label,
                                 roles,
                                 onChange,
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


    return (
        <FormControl className={classes.selector}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                native
                onChange={onChange}
                value={value}
                name="roleId"
                inputProps={{
                    name: 'roleId',
                }}>
                <option value=""/>
                {renderRoleOptions()}
            </Select>
        </FormControl>
    )

};