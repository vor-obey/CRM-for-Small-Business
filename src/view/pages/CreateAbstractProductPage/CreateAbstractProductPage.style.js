import Button from "@material-ui/core/Button";
import React from "react";

export const createAbstractProductPageStyles = (theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            alignItems: 'baseline',
            justifyContent: 'baseline',
        }
    },
    gridModal: {
        display: 'flex',
        backgroundColor: '#fff',
        justifyContent: 'flex-end'
    },
    buttonClose: {
        position: 'absolute',
        marginTop: theme.spacing(1)
    },
    buttonContainer: {
        alignContent: 'center',
        textAlign: 'center'
    },
    button: {
        margin: 16
    },
    inputName: {
        marginTop: 10,
        marginBottom: 10
    },
    label: {
        marginTop: 10,
        marginBottom: 10
    }
}));
