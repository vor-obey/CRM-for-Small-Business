import React, { Component } from 'react';
import { connect } from "react-redux";
import { postUser } from "../../../data/store/user/userThunkAction";
import { withStyles } from '@material-ui/core';

import { createuserStyle } from './CreateUser.style.js';
import SaveUserForm from '../../components/Form/SaveUserForm/SaveUserForm';


class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                firstName: '',
                lastName: '',
                middleName: '',
                email: '',
                password: '',
                confirmPassword: '',
                contactNumber: '',
                roleId: ''
            },
        };


        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const {
            confirmPassword,
            ...user
        } = this.state.inputs;

        if (user.password === confirmPassword) {
            this.props.postUser(user);
        }
    }

    render() {
        return (
            <div>
                <SaveUserForm
                    onSubmit={this.onSubmitHandler}
                />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        postUser: (user) => {
            dispatch(postUser(user));
        }
    }
};

export default withStyles(createuserStyle)(connect(null, mapDispatchToProps)(CreateUser));
