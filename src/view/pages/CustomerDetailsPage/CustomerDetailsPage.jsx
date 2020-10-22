import React, {useState, useCallback, useEffect} from "react";
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
import {isEmpty} from 'lodash';
import {CustomerDetails} from './CustomerDetails/CustomerDetails';
import {useTranslation} from "react-i18next";
import {useCustomerById} from '../../../utils/hooks/customerHooks';
import {CUSTOMERS} from "../../../constants/routes";
import {cleanCustomerDetail, deleteCustomer} from "../../../data/store/customer/customerActions";

const useStyles = makeStyles(customerDetailsStyle);

export const CustomerDetailsPage = ({history}) => {
    const {id} = useParams();
    const {customerDetails} = useCustomerById(id);
    const [isShow, setIsShow] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { t } = useTranslation('');

    useEffect(() => {
        return () => dispatch(cleanCustomerDetail())
    }, [dispatch])

    const onDeleteCustomer = useCallback( () => {
        dispatch(deleteCustomer(id))
    }, [dispatch, id]);

    const handleOpenDialog = useCallback(() => {
        setIsShow(prevState => !prevState);
    }, []);

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
                onAction={onDeleteCustomer}
            >{t('DELETE_CUSTOMER_TEXT')}</CustomDialog>
        </Container>
    );
};
