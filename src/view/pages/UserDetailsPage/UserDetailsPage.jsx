import React, {Component} from "react";
import {
    Container,
    withStyles
} from "@material-ui/core";
import { loadUser } from "../../../data/store/user/userThunkAction";
import { userPageStyle } from "../UsersPage/UserPage.style";
import { connect } from "react-redux";

class UserDetailsPage extends Component{
    componentDidMount() {
        const { loadUser } = this.props;
        loadUser();
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.userDetails);
        return(
            <Container className={classes.allUsers}>
                <div>
                    User {JSON.stringify(this.props.userDetails)}
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { userDetails } = state.userReducer;

    return {
        userDetails,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadUser: () => dispatch(loadUser(ownProps.match.params.id)),
    }
};

export default withStyles(userPageStyle)(connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage));
