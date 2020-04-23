import React, {useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {useProductTypeById} from '../../../utils/hooks/productHooks';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import isEmpty from 'lodash/isEmpty';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {Card, CardContent, CardHeader, ListItemText} from '@material-ui/core';

export const ProductTypeDetailsPage = () => {
    const {id} = useParams();
    const [productType] = useProductTypeById(id);

    const renderAbstractProducts = useCallback(() => {
        const {abstractProducts = {}} = productType;

        if (isEmpty(abstractProducts)) {
            return null;
        }

        return abstractProducts.map((abstractProduct) => {
            const {abstractProductId, name, price, description} = abstractProduct;
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
    }, [productType]);

    const renderAttributes = useCallback(() => {
        const {productTypeToAttributes = {}} = productType;
        if (isEmpty(productTypeToAttributes)) {
            return null;
        }

        return productTypeToAttributes.map(({attribute}) => {
            const {attributeId, name, attributeValues} = attribute;
            return (
                <Grid item xl={4} lg={4} key={attributeId}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography variant='body1'>
                                    {name}
                                </Typography>
                            }
                            style={{
                                padding: 5,
                                border: '1px solid rgba(0, 0, 0, 0.12)'
                            }}
                        />
                        <CardContent style={{maxHeight: 100, overflow: 'auto', padding: 0}}>
                            <List>
                                {attributeValues.map((attrValue) => (
                                        <ListItem key={attrValue.attributeValueId}>
                                            <ListItemText
                                                primary={attrValue.value}
                                            />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
    }, [productType]);

    return (
        <Container maxWidth='md' style={{marginTop: 30}}>
            <Paper style={{padding: 15}}>
                <Grid container item xl={12} lg={12}>
                    <Grid item style={{marginTop: 15, marginBottom: 15, textAlign: 'center', width: '100%'}}>
                        <Typography variant='h6'>
                            Product Type Details
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xl={12} lg={12}>
                    <Grid item xl={12} lg={12}>
                        <Typography variant='h6'>
                            Name
                        </Typography>
                        <Typography variant='body1'>
                            {productType.name}
                        </Typography>
                    </Grid>
                    <Grid item xl={12} lg={12} style={{marginTop: 15}}>
                        <Typography variant='h6'>
                            Description
                        </Typography>
                        <Typography variant='body1'>
                            {productType.description}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xl={12} lg={12} style={{marginTop: 30}}>
                    <Grid item xl={12} lg={12}>
                        <Typography variant='h6'>
                            Abstract products
                        </Typography>
                    </Grid>
                    <Grid item xl={12} lg={12}>
                        <List>
                            {renderAbstractProducts()}
                        </List>
                    </Grid>
                </Grid>
                <Grid container item xl={12} lg={12} style={{marginTop: 30}}>
                    <Grid item xl={12} lg={12}>
                        <Typography variant='h6'>
                            Attributes
                        </Typography>
                    </Grid>
                    {renderAttributes()}
                </Grid>
            </Paper>
        </Container>
    );
};