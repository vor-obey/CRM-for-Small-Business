import React, {Component} from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from '@material-ui/core';

export default class Admin extends Component{
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")

        let logIn = true
        if(token == null){
            logIn = false
        }

        this.state = {
            logIn
        }
        // const { setAuthTokens } = useAuth();
        //
        // function logOut() {
        //     setAuthTokens();
        // }
    }

    onClick(){
        localStorage.removeItem("token")
    }

render() {
    if(this.state.logIn === false) {
        return <Redirect to='/'/>
    }
    return (
        <div>
            Hey admin!<br />
            <Button
                type="submit"
                href='/login'
                onClick={this.onClick}
                variant="contained"
                color="secondary"
            >Log out</Button>
        </div>
    )
    }

}
