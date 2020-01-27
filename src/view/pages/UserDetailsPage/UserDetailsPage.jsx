import React, {Component} from "react";

import {
    Paper,
    Fab,
    Typography,
    Container,
    withStyles,
    List,
    ListItem,
    ListItemText,
    Grid,
} from "@material-ui/core";
import { loadUser } from "../../../data/store/user/userThunkAction";
import { userDetailsStyle } from "../UserDetailsPage/UserDetailsPage.style.js";
import { connect } from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


class UserDetailsPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            editable: true,
        };

        this.handleClickEdit = this.handleClickEdit.bind(this);
    }

    handleClickEdit() {
        this.setState((prevState) => ({
            editable: !prevState.editable,
        }));
    };

    componentDidMount() {
        const { loadUser } = this.props;
        loadUser();
    }

    renderUserDetails() {
        const { userDetails, classes } = this.props;
        if (userDetails) {
            return (
                <Grid container item xs={12} className={classes.list}>
                    <List>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    First Name
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {userDetails.firstName}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    Last Name
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {userDetails.lastName}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    Middle Name
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {userDetails.middleName}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    Email Address
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {userDetails.email}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    Contact number
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {userDetails.contactNumber}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    Role
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {userDetails.role.name}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Grid>
            )
        }
        return null;
    }

    render() {
        const { classes } = this.props;

        return(
            <Container component="main" className={classes.allUsers}>
                <Paper className={classes.paper}>
                    <Grid container item xs={12}
                          alignContent={'center'}
                          direction={'column'}
                          justify={'flex-start'}>
                        <Grid container item xs={12}
                              justify={'center'}>
                            <Typography variant="h4" className={classes.title} align="center" gutterBottom>
                                User Details
                            </Typography>
                        </Grid>
                        <Grid container item xs={12}>
                            {this.renderUserDetails()}
                        </Grid>
                        <Grid  container item xs={12}
                               alignContent={'center'}
                               justify={'center'}>
                            <Fab
                                color="primary"
                                aria-label="edit"
                                size="small"
                                className={classes.fab}
                            >
                                <EditIcon
                                    onClick={this.handleClickEdit}
                                />
                            </Fab>
                            <Fab
                                color="primary"
                                aria-label="edit"
                                size="small"
                                className={classes.fab}
                            >
                                <DeleteIcon
                                    onClick={this.handleClickEdit}
                                />
                            </Fab>
                        </Grid>
                    </Grid>
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
