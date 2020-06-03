import React, {useCallback} from "react";
import {Container, Grid, List, ListItem, Typography, makeStyles} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {customerOrderListStyle} from "./CustomerOrderList.style";
import {OrdersPage} from "../../pages/OrdersPage/OrdersPage";

const useStyles = makeStyles(customerOrderListStyle);

export const CustomerOrderList = (selected) => {
    const classes = useStyles();
    const {t} = useTranslation('');
    const selectedCustomer = selected.selected.username

    console.log('selectedCustomer', selectedCustomer);

    return (
        <Container className={classes.root}>
            <List>
                <ListItem divider>
                    <Grid container className={classes.gridOrderContainer}>
                        <Grid item xl={3} lg={3} md={3} sm={3}>
                            <Typography>{t('ORDER_NUMBER')}</Typography>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <Typography>{t('DESCRIPTION')}</Typography>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3}>
                            <Typography>{t('STATUS')}</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <Typography>{t('DATE')}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
            <OrdersPage />
        </Container>
    )
}