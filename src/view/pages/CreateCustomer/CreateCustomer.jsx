import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { postCustomer, loadCustomer } from "../../../data/store/customer/customerThunkAction";

import SaveCustomerForm from "../../components/Form/SaveCustomerForm/SaveCustomerForm";

class CreateCustomer extends PureComponent {
    constructor(props) {
        super(props);

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(userInput) {
        const {
            ...body
        } = userInput;
        const { history } = this.props;
        if (body) {
            this.props.postCustomer(body);
            history.push('/customers');

        }
    }

    render() {

        return (
            <div>
                <SaveCustomerForm
                    titleText="Create Customer"
                    onSubmit={this.onSubmitHandler}
                    submitText="Add new customer"
                />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        postCustomer: (body) => {
            dispatch(postCustomer(body));
        },
        loadCustomer: () => {
            dispatch(loadCustomer());
        }
    }
};

export default (connect(null, mapDispatchToProps)(CreateCustomer));
