import React, {useCallback, useEffect, useState} from "react";
import {
    FormControl,
    List,
    ListItem,
    IconButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Select,
    InputLabel,
    Typography,
    makeStyles
} from "@material-ui/core";
import RestoreIcon from '@material-ui/icons/Restore';
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
    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    const [newStatus, setNewStatus] = useState();
    const [isEditStatus, setIsEditStatus] = useState(true);
    const classes = useStyle();
    const {t} = useTranslation('');

    const editStatus = useCallback(() => {
        setIsEditStatus(prevState => !prevState);
    }, [])

    const restoreStatus = useCallback(() => {
        setIsEditStatus(prevState => !prevState);
        setNewStatus(undefined);
    }, [])

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
                <ListItemSecondaryAction>
                    <ListItemIcon>
                        <IconButton onClick={editStatus}>
                            <EditIcon className={classes.editButton} color={'secondary'}/>
                        </IconButton>
                    </ListItemIcon>
                </ListItemSecondaryAction>
            )
        }
        return (
            <ListItemSecondaryAction>
                <ListItemIcon>
                    <IconButton onClick={restoreStatus}>
                        <RestoreIcon className={classes.editButton} color={'secondary'}/>
                    </IconButton>
                </ListItemIcon>
            </ListItemSecondaryAction>
        )
    }, [classes, editStatus, restoreStatus, isEditStatus]);

    const renderField = useCallback(() => {
        if (isEditStatus) {
            return (
                <Typography
                    variant='body1'
                    className={classes.orderItem}>
                    {t(EOrderStatus[currentStatus])}
                </Typography>
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
                    value={newStatus || (currentStatus && currentStatus)}
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
        <List>
            <ListItem>
                {isEditStatus ? null : (
                    <ListItemIcon>
                        <IconButton onClick={saveStatus}>
                            <CheckIcon className={classes.editButton} color={'secondary'}/>
                        </IconButton>
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={renderField()}>
                </ListItemText>
                {renderActionButton()}
            </ListItem>
        </List>
    )
}
