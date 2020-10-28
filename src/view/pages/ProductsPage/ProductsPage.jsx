import React from 'react';
import {Container, Typography} from '@material-ui/core';
import List from '@material-ui/core/List';
import isEmpty from 'lodash/isEmpty';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import {useProductsState} from '../../../utils/hooks/productHooks';
import {useTranslation} from "react-i18next";
import {PRODUCTS_CREATE} from "../../../constants/routes";
import {ProductListItem} from "./ProductListItem";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 50
    },
    listItem : {
        justifyContent: 'center'
    },
    createButton: {
        marginTop: 20
    }
}))
export const ProductsPage = ({history}) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const { products, productsStatus } = useProductsState();

    return (
        <Container maxWidth='lg' className={classes.root}>
            <List>
                { (isEmpty(products) || productsStatus.isLoading) && <Placeholder /> }
                { products.map((product) => <ProductListItem key={product.productId} product={product} history={history} /> )}
            </List>
            <ListItem className={classes.listItem} >
                <Button
                    variant='outlined'
                    className={classes.createButton}
                    onClick={() => history.push(PRODUCTS_CREATE)}
                >
                    {t('CREATE')}
                </Button>
            </ListItem>
        </Container>
    );
};

const Placeholder = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    return (
        <ListItem className={classes.listItem}>
            <Typography variant='h5'>{t('NO_NEW_PRODUCTS')}</Typography>
        </ListItem>
    )
}
