import React, {useCallback} from 'react';
import {Container, ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import isEmpty from 'lodash/isEmpty';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {useProducts} from '../../../utils/hooks/productHooks';
import {useTranslation} from "react-i18next";

export const ProductsPage = ({history}) => {
    const {t} = useTranslation();
    const [products] = useProducts();

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
