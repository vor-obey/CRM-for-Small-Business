import React, {useCallback, useState} from 'react';
import Flag from 'react-world-flags'
import {Select, MenuItem, Button} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import i18next from 'i18next';

export const Flags = ({classes}) => {
    const [open, setOpen] = useState(false);
    const {i18n} = useTranslation('');

    const changeLanguage = useCallback(lng => () => {
        i18n.changeLanguage(lng);
    }, [i18n]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);
    return (
        <Select
            className={classes.flags}
            value={i18next.language}
            variant='standard'
            open={open}
            displayEmpty={false}
            onClose={handleClose}
            onOpen={handleOpen}>
            <MenuItem value="en">
                <Button onClick={changeLanguage('en')}>
                    <Flag code='gb' height="16"/>
                </Button>
            </MenuItem>
            <MenuItem value="ua">
                <Button onClick={changeLanguage('ua')}>
                    <Flag code='ua' height="16"/>
                </Button>
            </MenuItem>
            <MenuItem value="ru">
                <Button onClick={changeLanguage('ru')}>
                    <Flag code='ru' height="16"/>
                </Button>
            </MenuItem>
        </Select>

    )
};