import React from "react";
import ListItem from "@material-ui/core/ListItem";
import {PRODUCTS} from "../../../constants/routes";
import {ListItemText} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

export const ProductListItem = ({ product: { productId, name, price }, history }) => {
    return (
        <>
            <ListItem onClick={() => history.push(`${PRODUCTS}/${productId}`)} style={{cursor: 'pointer'}}>
                <ListItemText
                    primary={name}
                    secondary={`Price: ${price}`}
                />
            </ListItem>
            <Divider/>
        </>
    );
}
