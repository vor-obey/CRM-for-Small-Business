import React, {useCallback} from 'react';
import {useProductTypes} from '../../../utils/hooks/productHooks';
import {Container, Grid, ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import isEmpty from 'lodash/isEmpty';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const ProductTypesPage = ({history}) => {
    const {t} = useTranslation();
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

    if (isEmpty(productTypes)) {
        return (
            <Grid container justify='center' style={{display: 'grid', paddingTop: 24}}>
                <Typography variant='h5' style={{paddingBottom: 18}}>{t('NO_NEW_TYPES')}</Typography>
                <Button
                    type='submit'
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to='/create-product-type'
                >
                    {t('CREATE')}
                </Button>
            </Grid>
        );
    }

    return (
        <Container maxWidth='lg' style={{marginTop: 50}}>
            <Typography variant='h6' style={{textAlign: 'center'}}>
                {t('PRODUCT_TYPES')}
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
                        {t('CREATE')}
                    </Button>
                </ListItem>
            </List>
        </Container>
    );
};
