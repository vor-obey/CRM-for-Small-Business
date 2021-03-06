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
import {PRODUCT_TEMPLATES, PRODUCT_TEMPLATES_CREATE} from "../../../constants/routes";

export const AbstractProductsPage = ({history}) => {
    const {t} = useTranslation();
    const {abstractProducts, isLoading} = useAbstractProducts();

    const renderAbstractProducts = useCallback(() => {
        if (isEmpty(abstractProducts)) {
            return null;
        }

        return abstractProducts.map((product) => {
            const {abstractProductId, name, price, description} = product;
            return (
                <React.Fragment key={abstractProductId}>
                    <ListItem
                        onClick={() => history.push(`${PRODUCT_TEMPLATES}/${abstractProductId}`)}
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

    if (isEmpty(abstractProducts) && !isLoading) {
        return (
            <Grid container spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{minHeight: 'calc(100vh - 64px)'}}>
                <Grid container item xs={8} sm={2} style={{flexDirection: 'column', textAlign: 'center'}}>
                    <Typography variant='h5' style={{paddingBottom: 18}}>{t('NO_NEW_CATEGORIES')}</Typography>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={PRODUCT_TEMPLATES_CREATE}
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
                {renderAbstractProducts()}
                <ListItem style={{justifyContent: 'center'}}
                >
                    <Button
                        variant='outlined'
                        style={{marginTop: 20}}
                        onClick={() => history.push(PRODUCT_TEMPLATES_CREATE)}
                    >
                        {t('CREATE')}
                    </Button>
                </ListItem>
            </List>
        </Container>
    );
};
