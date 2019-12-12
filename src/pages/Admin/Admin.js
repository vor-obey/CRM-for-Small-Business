import React, {Component} from "react";
import { Redirect } from "react-router-dom";

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



render() {
    if(this.state.logIn === false) {
        return <Redirect to='/'/>
    }
    return (
        <div>
            Hey admin
        </div>
    )
    }

}
