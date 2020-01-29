import React, {Component} from "react";

import {
    Paper,
    Typography,
    Container,
    withStyles,
    List,
    Fab,
    ListItem,
    ListItemText,
    Grid,
} from "@material-ui/core";
import { loadUser, deleteUser } from "../../../data/store/user/userThunkAction";
import { userDetailsStyle } from "../UserDetailsPage/UserDetailsPage.style.js";
import { connect } from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CustomDialog } from '../../components/CustomDialog/CustomDialog';

class UserDetailsPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            editable: true,
            deleteDialog: false,
            isShow: false,
            onClose: true,
        };

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleClickDeleteUser = this.handleClickDeleteUser.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
    }

    handleOpenDialog() {
        this.setState((prevState) => ({
            isShow: !prevState.isShow,
        }));
    };

    handleClickDeleteUser() {
        const { deleteUser, history } = this.props;
        deleteUser();

        if (deleteUser) {
            history.push('/users');
        }
    };

    handleClickEdit() {
        const { location } = this.props;
        this.props.history.push(`${location.pathname}/edit`);
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
                                onClick={this.handleClickEdit}>
                                <EditIcon />
                            </Fab>
                            <Fab
                                color="primary"
                                aria-label="edit"
                                size="small"
                                className={classes.fab}
                                onClick={this.handleOpenDialog}
                            >
                                <DeleteIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </Paper>
                <CustomDialog
                    title="Delete User"
                    children="Are you sure you want to delete the user without the possibility of recovery?"
                    isShow={this.state.isShow}
                    onClose={this.handleOpenDialog}
                    closeText="Disagree"
                    onAction={this.handleClickDeleteUser}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { userDetails } = state.userReducer;

    return {
        userDetails
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadUser: () => dispatch(loadUser(ownProps.match.params.id)),
        deleteUser: () => dispatch(deleteUser(ownProps.match.params.id)),
    }
};

export default withStyles(userDetailsStyle)(connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage));
