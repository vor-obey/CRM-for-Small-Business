import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { editUser, loadUser } from "../../../data/store/user/userThunkAction";
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

            roleId,
            ...user
        } = userInput;

        const userId = this.props.match.params.id;
        if (user.password === confirmPassword && userId) {
            user.userId = userId;
            this.props.editUser(user);
            this.props.history.goBack();
        }
    }

    componentDidMount() {
        const { loadUser, match} = this.props;
        const { id } = match.params;

        loadUser(id);
    }

    render() {
        return (
            <div>
                {
                    this.props.userDetails ? (
                        <SaveUserForm
                            onSubmit={this.onSubmitHandler}
                            titleText="Edit User"
                            submitText="Edit"
                            userDetails={this.props.userDetails}
                            disabled={true}
                            // fill={this.preFill}
                        />
                    ) : null
                }
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    const {userDetails, user} = state.userReducer;

    return {
        userDetails,
        user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (user) => {
            dispatch(editUser(user));
        },
        loadUser: (id) => dispatch(loadUser(id)),
    }
};

export default withStyles(createuserStyle)(connect(mapStateToProps, mapDispatchToProps)(EditUser));
