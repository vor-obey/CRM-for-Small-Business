import React from 'react';
import { Redirect } from "react-router-dom";
import {Button} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export default function LogOut(){
    const { t } = useTranslation('');

    let token = localStorage.getItem("acc");

    if(token == null){
        return <Redirect to='/'/>
    }

    function onClick(){
        localStorage.removeItem("acc")
    }

        return (
            <div>
                {t('LOGOUT_TEXT')} <br />
                <Button
                type="submit"
                href='/'
                onClick={onClick()}
                variant="contained"
                color="secondary"
                >{t('LOGOUT_BUTTON')}</Button>
            </div>
        );
}
