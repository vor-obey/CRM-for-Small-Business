import React from "react";
import {Container, Grid} from "@material-ui/core";
import {Autocomplete} from "../../components/Autocomplete/Autocomplete";

export const CreateCustomerShippingDetails = () => {

    return (
        <Container component='main'>
            <Grid container>
                <Grid container item xs={12} spacing={12}>
                    <Autocomplete entity='City'/>
                    <Autocomplete entity='Warehouse'/>
                </Grid>
            </Grid>
        </Container>
    );
};