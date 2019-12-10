import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class LogOut extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem('token')
    }
    render() {
        return (
            <div>
                you have been logout<br />
                <Link to="/login">Plz login</Link>
            </div>
        );
    }
}

