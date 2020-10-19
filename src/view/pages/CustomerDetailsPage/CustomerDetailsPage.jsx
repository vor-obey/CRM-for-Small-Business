import React, {useState, useCallback} from "react";
import {
    Paper,
    Typography,
    Container,
    makeStyles,
    Fab,
    Grid,
} from "@material-ui/core";
import {customerDetailsStyle} from "./CustomerDetailsPage.style";
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
import {useTranslation} from "react-i18next";
import {useCustomerById} from '../../../utils/hooks/customerHooks';
import {CUSTOMERS} from "../../../constants/routes";

const useStyles = makeStyles(customerDetailsStyle);

export const CustomerDetailsPage = ({history}) => {
    const {id} = useParams();
    const {customerDetails} = useCustomerById(id);
    const [isShow, setIsShow] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { t } = useTranslation('');

    const handleOpenDialog = useCallback(() => {
        setIsShow(prevState => !prevState);
    }, []);

    const handleClickDeleteCustomer = useCallback(async () => {
        try {
            dispatch(setIsLoading( true));
            const response = await CustomerService.delete(id);
            if (response) {
                history.push(CUSTOMERS);
                dispatch(setIsLoading(false))
            }
        } catch (e) {
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}))
        }

    }, [history, dispatch, id]);

    const handleClickEdit = useCallback(() => {
        history.push(`${CUSTOMERS}/${id}/edit`);
    }, [id, history]);


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
                      alignContent='center'
                      direction='column'
                      justify='flex-start'>
                    <Grid container item xs={12}
                          justify='center'>
                        <Typography variant="h5" className={classes.title} align="center" gutterBottom>
                            {t('CUSTOMER_DETAILS')}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        {renderCustomerDetails()}
                    </Grid>
                    <Grid container item xs={12}
                           alignContent='center'
                           justify='center'>
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
                title={t('DELETE_CUSTOMER')}
                isShow={isShow}
                onClose={handleOpenDialog}
                closeText={t('DISAGREE')}
                actionText={t('AGREE')}
                onAction={handleClickDeleteCustomer}
            >{t('DELETE_CUSTOMER_TEXT')}</CustomDialog>
        </Container>
    );
};
