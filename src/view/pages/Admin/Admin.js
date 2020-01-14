import React, {Component} from "react";
// import { Redirect } from "react-router-dom";


export default class Admin extends Component{
    // constructor(props) {
    //     super(props);
    //
    //     // this.state = {
    //     //     isAuthenticated: false
    //     // };
    //     //
    //     // const token = localStorage.getItem('jwtToken');
    //     //
    //     // if (token){
    //     //     this.setState({ isAuthenticated: true });
    //     // }
    // }

        render(){
            // if(this.state.isAuthenticated === false) {
            //     return (<Redirect to='/'/>);
            // }
            // console.log(this.state);
            return (
                <div>
                    Hey admin
                </div>
            )
        }

}
