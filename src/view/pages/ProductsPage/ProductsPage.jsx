import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {ProductService} from '../../../services';
import {Container, ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import isEmpty from 'lodash/isEmpty';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

export const ProductsPage = ({history}) => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await ProductService.list();
                setProducts(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        fetchProducts();
    }, [dispatch]);

    const renderProducts = useCallback(() => {
        if (isEmpty(products)) {
            return null;
        }

        return products.map((product) => {
            const {productId, name, price} = product;
            return (
                <React.Fragment key={productId}>
                    <ListItem>
                        <ListItemText
                            primary={name}
                            secondary={`Price: ${price}`}
                        />
                    </ListItem>
                    <Divider/>
                </React.Fragment>
            );
        });
    }, [products]);

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
                    Create
                </Button>
            </ListItem>
        </Container>
    );
};