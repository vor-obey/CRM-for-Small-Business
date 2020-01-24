import React, {Component} from "react";
import {
    Paper,
    Card,
    Typography,
    Container,
    withStyles,
    TextField,
    Grid } from "@material-ui/core";
import { loadUser } from "../../../data/store/user/userThunkAction";
import { userDetailsStyle } from "../UserDetailsPage/UserDetailsPage.style.js";
import { connect } from "react-redux";

class UserDetailsPage extends Component{
    componentDidMount() {
        const { loadUser } = this.props;
        loadUser();
    }

    renderUserDetails() {
        const { userDetails } = this.props;
         if (userDetails) {
             return (
                 <Grid container item xs={12}>
                     <TextField
                         label={"First Name"}
                         margin={"normal"}
                         name={"firstName"}
                         type={"text"}
                         variant={"outlined"}
                         disabled={false}
                         value={userDetails.firstName}
                     />
                     <TextField
                         label={"Last Name"}
                         margin={"normal"}
                         name={"firstName"}
                         type={"text"}
                         variant={"outlined"}
                         disabled={false}
                         value={userDetails.lastName}
                     />
                     <TextField
                         label={"Middle Name"}
                         margin={"normal"}
                         name={"firstName"}
                         type={"text"}
                         variant={"outlined"}
                         disabled={false}
                         value={userDetails.middleName}
                     />
                     <TextField
                         label={"Email Address"}
                         margin={"normal"}
                         name={"firstName"}
                         type={"text"}
                         variant={"outlined"}
                         disabled={false}
                         value={userDetails.email}
                     />
                     <TextField
                         label={"Contact number"}
                         margin={"normal"}
                         name={"firstName"}
                         type={"text"}
                         variant={"outlined"}
                         disabled={false}
                         value={userDetails.contactNumber}
                     />
                 </Grid>
             )
         }
         return null;
    }

    render() {
        const { classes } = this.props;

        return(
            <Container component="main" className={classes.allUsers}>
                <Paper className={classes.paper} variant="outlined">
                    <Card className={classes.card} variant="outlined">
                        <Typography variant="h5" className={classes.title} align="center" color="textSecondary" gutterBottom>
                            User Details
                        </Typography>
                        <form className={classes.form}>
                            <Grid >
                                {this.renderUserDetails()}
                            </Grid>
                        </form>
                    </Card>
                    <Card className={classes.card}>
                        <Typography variant="h5" className={classes.title} align="center" color="textSecondary" gutterBottom>
                            Orders
                        </Typography>
                    </Card>
                </Paper>
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

export default withStyles(userDetailsStyle)(connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage));
