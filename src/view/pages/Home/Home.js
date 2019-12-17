import React, { Component } from "react";
import { connect } from 'react-redux';

import { loadUsers } from "../../../data/store/user/userThunkAction";

class Home extends Component {
    componentDidMount() {
        const { loadUsers } = this.props;
        loadUsers();
    }

    render() {
        // console.info(this.props.userList);

        return (
            <div>
                Welcome
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userList } = state.userReducer;

    return {
      userList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => dispatch(loadUsers()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
