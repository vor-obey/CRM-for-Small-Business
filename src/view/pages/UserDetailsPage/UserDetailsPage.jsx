import React, {Component} from "react";
import {
    Paper,
    Card,
    Typography,
    Container,
    List,
    ListItem,
    ListItemText,
    withStyles
} from "@material-ui/core";
import { loadUser } from "../../../data/store/user/userThunkAction";
import { userDetailsStyle } from "../UserDetailsPage/UserDetailsPage.style.js";
import { connect } from "react-redux";

class UserDetailsPage extends Component{
    componentDidMount() {
        const { loadUser } = this.props;
        loadUser();
    }

    renderUserInfo() {
        const { userDetails } = this.props;

        if (userDetails) {
            return this.props.userDetails.map( u =>
                <ListItem style={{cursor: 'pointer'}} key={u.id} >
                    <ListItemText>{u.id}</ListItemText>
                </ListItem>
            )
        }

        return null;
    }

    render() {
        const { classes } = this.props;
        // console.log(this.userDetails);
        return(
            <Container className={classes.allUsers}>
                <Paper className={classes.paper} variant="outlined">
                    <Card className={classes.card} variant="outlined">
                        <Typography variant="h5" className={classes.title} align="center" color="textSecondary" gutterBottom>
                            User snapshot
                        </Typography>
                        <List>
                            {this.renderUserInfo}
                            <ListItem>1</ListItem>
                            <ListItem>1</ListItem>
                            <ListItem>1</ListItem>
                        </List>

                    </Card>
                    <Card className={classes.card}>
                        <Typography variant="h5" className={classes.title} align="center" color="textSecondary" gutterBottom>
                            Orders
                        </Typography>
                    </Card>
                </Paper>


                <div>
                    {/*User {JSON.stringify(this.props.userDetails)}*/}
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
    console.log(ownProps.match.params.id);
    return {
        loadUser: () => dispatch(loadUser(ownProps.match.params.id)),
    }
};

export default withStyles(userDetailsStyle)(connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage));
