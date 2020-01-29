import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { postUser, loadUsers } from "../../../data/store/user/userThunkAction";
import { withStyles } from '@material-ui/core';

import { createuserStyle } from './CreateUser.style.js';
import SaveUserForm from '../../components/Form/SaveUserForm/SaveUserForm';


class CreateUser extends PureComponent {
    constructor(props) {
        super(props);

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(userInput) {
        const {
            confirmPassword,
            ...user
        } = userInput;
        const { history } = this.props;
        if (user.password === confirmPassword) {
            this.props.postUser(user);
            history.push('/users');
        }
    }

    render() {
        return (
            <div>
                <SaveUserForm
                    titleText="Create user"
                    onSubmit={this.onSubmitHandler}
                    submitText="Add new user"
                />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        postUser: (user) => {
            dispatch(postUser(user));
        },
        loadUsers: () => {
            dispatch(loadUsers());
        }
    }
};

export default withStyles(createuserStyle)(connect(null, mapDispatchToProps)(CreateUser));
