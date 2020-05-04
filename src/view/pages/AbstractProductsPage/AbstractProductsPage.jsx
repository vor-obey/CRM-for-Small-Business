import React, {useCallback} from 'react';
import {Container, Grid, ListItemText, Typography} from '@material-ui/core';
import List from '@material-ui/core/List';
import isEmpty from 'lodash/isEmpty';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {useAbstractProducts} from '../../../utils/hooks/productHooks';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const AbstractProductsPage = ({history}) => {
    const {t} = useTranslation();
    const [abstractProducts] = useAbstractProducts();

    const renderAbstractProducts = useCallback(() => {
        if (isEmpty(abstractProducts)) {
            return null;
        }

        return abstractProducts.map((product) => {
            const {abstractProductId, name, price, description} = product;
            return (
                <React.Fragment key={abstractProductId}>
                    <ListItem
                        onClick={() => history.push(`/abstract-products/${abstractProductId}`)}
                        style={{cursor: 'pointer'}}
                    >
                        <ListItemText
                            primary={name}
                            secondary={`${description}, ${price}`}
                        />
                    </ListItem>
                    <Divider/>
                </React.Fragment>
            );
        });
    }, [abstractProducts, history]);

    if (isEmpty(abstractProducts)) {
        return (
            <Grid container justify='center' style={{display: 'grid', paddingTop: 24}}>
                <Typography variant='h5' style={{paddingBottom: 18}}>{t('NO_NEW_CATEGORIES')}</Typography>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to='/create-abstract-product'
                >
                    {t('CREATE')}
                </Button>
            </Grid>
        );
    }

    return (
        <Container maxWidth='lg' style={{marginTop: 50}}>
            <List>
                {renderAbstractProducts()}
                <ListItem style={{justifyContent: 'center'}}
                >
                    <Button
                        variant='outlined'
                        style={{marginTop: 20}}
                        onClick={() => history.push('/create-abstract-product')}
                    >
                        {t('CREATE')}
                    </Button>
                </ListItem>
            </List>
        </Container>
    );
};
