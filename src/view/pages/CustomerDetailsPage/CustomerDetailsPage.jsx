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
import { loadCustomer, deleteCustomer } from "../../../data/store/customer/customerThunkAction";
import { customerDetailsStyle } from "../CustomerDetailsPage/CustomerDetailsPage.style";
import { connect } from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CustomDialog } from '../../components/CustomDialog/CustomDialog';

class CustomerDetailsPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            deleteDialog: false,
            isShow: false,
            onClose: true,
        };

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleClickDeleteCustomer = this.handleClickDeleteCustomer.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
    }

    handleOpenDialog() {
        this.setState((prevState) => ({
            isShow: !prevState.isShow,
        }));
    };

    handleClickDeleteCustomer() {
        const { deleteCustomer } = this.props;
        deleteCustomer();

        // if (deleteCustomer) {
        //     history.push('/customers');
        // }
    };

    handleClickEdit() {
        const { customerDetails } = this.props;
        this.props.history.push(`${customerDetails.customerId}/edit`);
    };

    componentDidMount() {
        const { loadCustomer } = this.props;
        loadCustomer();
    }


    renderCustomerDetails() {
        const { customerDetails, classes } = this.props;

        if (customerDetails) {
            return (
                <Grid container item xs={12} className={classes.list}>
                    <List>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    Username
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {customerDetails.username}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    Name
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {customerDetails.name}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    Contact Number
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {customerDetails.contactNumber}
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
                                    {customerDetails.contactEmail}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="overline">
                                    Details
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {customerDetails.details}
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
                            {this.renderCustomerDetails()}
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
                    title="Delete Customer"
                    children="Are you sure you want to delete the customer without the possibility of recovery?"
                    isShow={this.state.isShow}
                    onClose={this.handleOpenDialog}
                    closeText="Disagree"
                    onAction={this.handleClickDeleteCustomer}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { customerDetails } = state.customerReducer;

    return {
        customerDetails
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadCustomer: () => dispatch(loadCustomer(ownProps.match.params.id)),
        deleteCustomer: () => dispatch(deleteCustomer(ownProps.match.params.id)),
    }
};

export default withStyles(customerDetailsStyle)(connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsPage));
