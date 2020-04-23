import React, {useCallback} from 'react';
import {useProductTypes} from '../../../utils/hooks/productHooks';
import {Container, ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import isEmpty from 'lodash/isEmpty';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export const ProductTypesPage = ({history}) => {
    const [productTypes] = useProductTypes();

    const renderProductTypes = useCallback(() => {
        if (isEmpty(productTypes)) {
            return null;
        }

        return productTypes.map((productType) => {
            const {productTypeId, name, description} = productType;
            return (
                <React.Fragment key={productTypeId}>
                    <ListItem onClick={() => history.push(`/product-types/${productTypeId}`)}
                              style={{cursor: 'pointer'}}>
                        <ListItemText
                            primary={name}
                            secondary={description}
                        />
                    </ListItem>
                    <Divider/>
                </React.Fragment>
            );
        });
    }, [productTypes, history]);

    return (
        <Container maxWidth='lg' style={{marginTop: 50}}>
            <Typography variant='h6' style={{textAlign: 'center'}}>
                Product Types
            </Typography>
            <List>
                {renderProductTypes()}
                <ListItem style={{justifyContent: 'center'}}
                >
                    <Button
                        variant='outlined'
                        style={{marginTop: 20}}
                        onClick={() => history.push('/create-product-type')}
                    >
                        Create
                    </Button>
                </ListItem>
            </List>
        </Container>
    );
};