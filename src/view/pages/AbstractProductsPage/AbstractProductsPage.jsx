import React, {useCallback, useEffect, useState} from 'react';
import {Container, ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {AbstractProductService} from '../../../services';
import {useDispatch} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

export const AbstractProductsPage = ({history}) => {
    const dispatch = useDispatch();
    const [abstractProducts, setAbstractProducts] = useState([]);

    useEffect(() => {
        const fetchAbstractProducts = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await AbstractProductService.list();
                setAbstractProducts(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: false, message: e.message, success: false}));
            }
        };
        fetchAbstractProducts();
    }, [dispatch]);

    const renderAbstractProducts = useCallback(() => {
        if (isEmpty(abstractProducts)) {
            return null;
        }

        return abstractProducts.map((product) => {
            const {abstractProductId, name, price, description} = product;
            return (
                <React.Fragment key={abstractProductId}>
                    <ListItem>
                        <ListItemText
                            primary={name}
                            secondary={`${description}, ${price}`}
                        />
                    </ListItem>
                    <Divider/>
                </React.Fragment>
            );
        });
    }, [abstractProducts]);

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
                        Create
                    </Button>
                </ListItem>
            </List>
        </Container>
    );
};