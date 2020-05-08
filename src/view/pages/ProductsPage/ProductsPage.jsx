import React, {useCallback} from 'react';
import {Container, Grid, ListItemText, Typography} from '@material-ui/core';
import List from '@material-ui/core/List';
import isEmpty from 'lodash/isEmpty';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {useProducts} from '../../../utils/hooks/productHooks';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const ProductsPage = ({history}) => {
    const {t} = useTranslation();
    const [products,, loading] = useProducts();

    const renderProducts = useCallback(() => {
        if (isEmpty(products)) {
            return null;
        }

        return products.map((product) => {
            const {productId, name, price} = product;
            return (
                <React.Fragment key={productId}>
                    <ListItem onClick={() => history.push(`/products/${productId}`)} style={{cursor: 'pointer'}}>
                        <ListItemText
                            primary={name}
                            secondary={`Price: ${price}`}
                        />
                    </ListItem>
                    <Divider/>
                </React.Fragment>
            );
        });
    }, [products, history]);

    if (isEmpty(products) && !loading) {
        return (
            <Grid container spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{minHeight: 'calc(100vh - 64px)'}}>
                <Grid container item xs={8} sm={2} style={{flexDirection: 'column', textAlign: 'center'}}>
                    <Typography variant='h5' style={{paddingBottom: 18}}>{t('NO_NEW_PRODUCTS')}</Typography>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to='/create-product'
                    >
                        {t('CREATE')}
                    </Button>
                </Grid>
            </Grid>
        );
    }
    return (
        <Container maxWidth='lg' style={{marginTop: 50}}>
            <List>
                {renderProducts()}
            </List>
            <ListItem style={{justifyContent: 'center'}}
            >
                <Button
                    variant='outlined'
                    style={{marginTop: 20}}
                    onClick={() => history.push('/create-product')}
                >
                    {t('CREATE')}
                </Button>
            </ListItem>
        </Container>
    );
};
