import React from 'react';
import { Redirect } from "react-router-dom";
import {Button} from "@material-ui/core";

export default function LogOut(props){
    let token = localStorage.getItem("token")
    if(token == null){
        return <Redirect to='/'/>
    }
    function onClick(){
        localStorage.removeItem("token")

    }

        return (
            <div>
                U could logout, just click <br />
                <Button
                type="submit"
                href='/'
                onClick={onClick()}
                variant="contained"
                color="secondary"
                >Log out</Button>
            </div>
        );
}
