import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadCustomers } from "../../../data/store/customer/customerThunkAction";

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Container,
    withStyles } from '@material-ui/core';
import { customersPageStyle } from "./CustomersPage.style";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class CustomersPage extends Component {

    componentDidMount() {
        const { loadCustomers } = this.props;
        loadCustomers();
    }

    renderRows() {
        const { customerList } = this.props;

        if (customerList) {
            return customerList.map((customer) => {
                return (
                    <TableRow style={{cursor: 'pointer'}} key={customer.customerId} onClick={() => this.props.history.push(`/customers/${customer.customerId}`)}>
                        <TableCell align="left">{customer.username}</TableCell>
                        <TableCell align="left">{customer.name}</TableCell>
                        <TableCell align="left">{customer.contactEmail}</TableCell>
                        <TableCell align="left">{customer.contactNumber}</TableCell>
                    </TableRow>
                )
            })
        }
        return null;
    }

    render() {
        const { classes } = this.props;

        return(
            <Container className={classes.allUsers}>
                <TableContainer>
                    <Table className={classes.table} align="center" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Username</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Contact number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderRows()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    component={Link}
                    to={'/create-customer'}
                >
                    <PersonAddIcon className={classes.addUser} />
                    Create customer
                </Button>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { customerList } = state.customerReducer;

    return {
        customerList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadCustomers: () => dispatch(loadCustomers()),
    }
};

export default withStyles(customersPageStyle)(connect(mapStateToProps, mapDispatchToProps)(CustomersPage));

