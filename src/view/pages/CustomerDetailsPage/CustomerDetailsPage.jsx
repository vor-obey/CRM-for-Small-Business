import React, {useState, useCallback, useEffect} from "react";

import {
    Paper,
    Typography,
    Container,
    makeStyles,
    Fab,
    Grid,
} from "@material-ui/core";
import { customerDetailsStyle } from "../CustomerDetailsPage/CustomerDetailsPage.style.js";
import {useDispatch} from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CustomDialog } from '../../components/CustomDialog/CustomDialog';
import {useParams} from 'react-router-dom';
import {CustomerService} from "../../../services";
import {isEmpty} from 'lodash';
import {CustomerDetails} from './CustomerDetails/CustomerDetails';
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

const useStyles = makeStyles(customerDetailsStyle);

export const CustomerDetailsPage = (props) => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const classes = useStyles();
    const [isShow, setIsShow] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({});

    const handleOpenDialog = useCallback(() => {
        setIsShow(prevState => !prevState);
    }, []);

    useEffect(() => {
        const fetchCustomerById = async (id) => {
            const response = await CustomerService.getCustomerById(id);
            setCustomerDetails(response);
        };

        fetchCustomerById(id);
    }, [dispatch, id]);

    const handleClickDeleteCustomer = useCallback(async () => {
        const {history} = props;
        try {
            dispatch(setIsLoading( true));
            const response = await CustomerService.delete(id);
            if (response) {
                history.push('/customers');
                dispatch(setIsLoading(false))
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
        }

    }, [props, dispatch, id]);

    const handleClickEdit = useCallback(() => {
        const {history} = props;
        history.push(`${id}/edit`);
    }, [id, props]);


    const renderCustomerDetails = useCallback(() => {
        if (isEmpty(customerDetails)) {
            return null;
        }
        return <CustomerDetails customerDetails={customerDetails} classes={classes}/>
    }, [classes, customerDetails]);

    return(
        <Container component="main" className={classes.allCustomers}>
            <Paper className={classes.paper}>
                <Grid container item xs={12}
                      alignContent={'center'}
                      direction={'column'}
                      justify={'flex-start'}>
                    <Grid container item xs={12}
                          justify={'center'}>
                        <Typography variant="h4" className={classes.title} align="center" gutterBottom>
                            Customer Details
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        {renderCustomerDetails()}
                    </Grid>
                    <Grid  container item xs={12}
                           alignContent={'center'}
                           justify={'center'}>
                        <Fab
                            color="primary"
                            aria-label="edit"
                            size="small"
                            className={classes.fab}
                            onClick={handleClickEdit}>
                            <EditIcon />
                        </Fab>
                        <Fab
                            color="primary"
                            aria-label="edit"
                            size="small"
                            className={classes.fab}
                            onClick={handleOpenDialog}
                        >
                            <DeleteIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
            <CustomDialog
                title="Delete Customer"
                children="Are you sure you want to delete the customer without the possibility of recovery?"
                isShow={isShow}
                onClose={handleOpenDialog}
                closeText="Disagree"
                onAction={handleClickDeleteCustomer}
            />
        </Container>
    );
};
