import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { editUser } from "../../../data/store/user/userThunkAction";
import { withStyles } from '@material-ui/core';

import { createuserStyle } from '../CreateUser/CreateUser.style.js';
import SaveUserForm from '../../components/Form/SaveUserForm/SaveUserForm';


class EditUser extends PureComponent {
    constructor(props) {
        super(props);

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(userInput) {
        const {
            confirmPassword,
            ...user
        } = userInput;

        if (user.password === confirmPassword) {
            this.props.editUser(user);

        }
    }

    // componentWillUnmount() {
    //     this.props.clearEditUser();
    // }

    render() {
        return (
            <div>
                {/*{*/}
                {/*    this.props.editUser ? (*/}
                {/*        <SaveUserForm*/}
                {/*            onSubmit={this.onSubmitHandler}*/}
                {/*            titleText="Edit User"*/}
                {/*            submitText="Edit"*/}
                {/*            userDetails={this.props.editUser}*/}
                {/*        />*/}
                {/*    ) : null*/}
                {/*}*/}
                <SaveUserForm
                    onSubmit={this.onSubmitHandler}
                    titleText="Edit User"
                    submitText="Edit"
                    // userDetails={this.props.editUser}
                />
            </div>
        );
    }
}
//
// const mapStateToProps = ( { userReducer }) => {
//    return {
//        user: userReducer.editUser
//    }
// };

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (user) => {
            dispatch(editUser(user));
        },
        // clearEditUser: () => {
        //     dispatch(clearEditUser())
        // }
    }
};

export default withStyles(createuserStyle)(connect(null, mapDispatchToProps)(EditUser));
