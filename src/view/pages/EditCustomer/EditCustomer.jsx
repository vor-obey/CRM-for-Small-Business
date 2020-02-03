import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { editCustomer, loadCustomer } from "../../../data/store/customer/customerThunkAction";
import { withStyles } from '@material-ui/core';

import { createuserStyle } from '../CreateUser/CreateUser.style.js';
import SaveCustomerForm from '../../components/Form/SaveCustomerForm/SaveCustomerForm';


class EditUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: '',
                name: '',
                contactEmail: '',
                contactNumber: '',
                details: '',
            },
        };
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(body) {
        this.props.editCustomer(body);
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                {
                    this.props.editCustomer ? (
                        <SaveCustomerForm
                            onSubmit={this.onSubmitHandler}
                            titleText="Edit Customer"
                            submitText="Edit"
                            userDetails={this.props.editCustomer}
                            disabled={true}
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editCustomer: (body) => {
            dispatch(editCustomer(body));
        },
        loadCustomer: () => dispatch(loadCustomer(ownProps.match.params.id)),
    }
};

export default withStyles(createuserStyle)(connect(mapStateToProps, mapDispatchToProps)(EditUser));
