import React, {useCallback, useEffect, useState} from "react";
import {
    Grid,
    FormControl,
    IconButton,
    Select,
    InputLabel,
    Typography,
    makeStyles
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import {EOrderStatus} from "../../../constants/statuses";
import {editOrderStatusStyles} from "./EditOrderStatus.style";
import {useTranslation} from "react-i18next";

const useStyle = makeStyles(editOrderStatusStyles);

export function EditOrderStatus({
                                    status,
                                    submit
                                }) {
    const [currentStatus, setCurrentStatus] = useState(status);
    const [newStatus, setNewStatus] = useState();
    const [isEditStatus, setIsEditStatus] = useState(true);
    const classes = useStyle();
    const {t} = useTranslation('');

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    const editStatus = useCallback(() => {
        setIsEditStatus(prevState => !prevState);
    }, []);

    const restoreStatus = useCallback(() => {
        setIsEditStatus(prevState => !prevState);
        setNewStatus(undefined);
    }, []);

    const onStatusSelectHandler = useCallback((value) => {
        setNewStatus(value);
    }, [setNewStatus]);

    const saveStatus = useCallback(() => {
        setCurrentStatus(newStatus);
        submit(newStatus);
        setIsEditStatus(prevState => !prevState);
    }, [newStatus, submit]);

    const renderStatuses = useCallback(() => {
        const entries = Object.entries(EOrderStatus);
        return entries.map(([key, value]) => {
            return <option key={key} value={key}>{t(value)}</option>
        });
    }, [t]);

    const renderActionButton = useCallback(() => {
        if (isEditStatus) {
            return (
                <IconButton onClick={editStatus}>
                    <EditIcon className={classes.editButton} color={'secondary'}/>
                </IconButton>
            )
        }
        return (
            <IconButton onClick={restoreStatus}>
                <CloseIcon className={classes.editButton} color={'secondary'}/>
            </IconButton>
        )
    }, [classes, editStatus, restoreStatus, isEditStatus]);

    const renderAddButton = useCallback(() => {
        if (isEditStatus) {
            return null
        }
        return (
            <Grid className={classes.actionADD}>
                <IconButton onClick={saveStatus}>
                    <CheckIcon className={classes.editButton} color={'secondary'}/>
                </IconButton>
            </Grid>
        )
    }, [classes, isEditStatus, saveStatus]);

    const renderField = useCallback(() => {
        if (isEditStatus) {
            return (
                <Grid className={classes.currentStatus}>
                    <Typography
                        variant='body1'>
                        {t(EOrderStatus[currentStatus])}
                    </Typography>
                </Grid>
            )
        }
        return (
            <FormControl variant="filled" size={"small"} margin={'none'}>
                <InputLabel>{'Select status'}</InputLabel>
                <Select
                    label={'Select status'}
                    classes={{
                        disabled: classes.selectStatusDisabled,
                        filled: classes.selectStatusFilled,
                    }}
                    native
                    name="status"
                    value={newStatus || currentStatus}
                    onChange={(event) => onStatusSelectHandler(event.target.value)}
                    inputProps={{
                        name: 'status',
                    }}>
                    {renderStatuses()}
                </Select>
            </FormControl>
        )
    }, [classes, isEditStatus, onStatusSelectHandler, renderStatuses, currentStatus, newStatus, t]);

    return (
        <Grid item xs={12} sm={12} className={classes.orderItem}>
            {renderAddButton()}
            <Grid className={classes.statusForm}>
                {renderField()}
            </Grid>
            <Grid className={classes.actionButtonPanel}>
                {renderActionButton()}
            </Grid>
        </Grid>
    )
}
