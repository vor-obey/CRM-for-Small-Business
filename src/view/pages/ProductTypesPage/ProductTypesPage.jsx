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
import {PRODUCT_TYPES, PRODUCT_TYPES_CREATE} from "../../../constants/routes";

export const ProductTypesPage = ({history}) => {
    const {t} = useTranslation();
    const {productTypes, loading} = useProductTypes();

    const renderProductTypes = useCallback(() => {
        if (isEmpty(productTypes)) {
            return null;
        }

        return productTypes.map((productType) => {
            const {productTypeId, name, description} = productType;
            return (
                <React.Fragment key={productTypeId}>
                    <ListItem onClick={() => history.push(`${PRODUCT_TYPES}/${productTypeId}`)}
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

    if (isEmpty(productTypes) && !loading) {
        return (
            <Grid container spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{minHeight: 'calc(100vh - 64px)'}}>
                <Grid container item xs={8} sm={2} style={{flexDirection: 'column', textAlign: 'center'}}>
                    <Typography variant='h5' style={{paddingBottom: 18}}>{t('NO_NEW_TYPES')}</Typography>
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={PRODUCT_TYPES_CREATE}
                    >
                        {t('CREATE')}
                    </Button>
                </Grid>
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
                        onClick={() => history.push(PRODUCT_TYPES_CREATE)}
                    >
                        {t('CREATE')}
                    </Button>
                </ListItem>
            </List>
        </Container>
    );
};
