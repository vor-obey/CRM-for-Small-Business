import React, {Component} from 'react';

import {
    Avatar, Button, Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NumberFormat from 'react-number-format';
import { saveCustomerStyle } from './SaveCustomerForm.style';

class SaveUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: '',
                name: '',
                contactEmail: '',
                contactNumber: '',
                details: '',
            },
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        const inputs = {
            ...this.state.inputs,
            [e.target.name]: e.target.value,
        };
        this.setState({ inputs });

    }


    onSubmit(e){
        e.preventDefault();
        this.props.onSubmit(this.state.inputs);
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {this.props.titleText}
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit.bind(this)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={"Username"}
                                    name={"username"}
                                    variant={"outlined"}
                                    type={"text"}
                                    value={this.state.inputs.username}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={"Name"}
                                    name={"name"}
                                    variant={"outlined"}
                                    type={"text"}
                                    value={this.state.inputs.name}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label={"Email Address"}
                                    name={"contactEmail"}
                                    variant={"outlined"}
                                    type="email"
                                    value={this.state.inputs.contactEmail}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <NumberFormat
                                    customInput={TextField}
                                    label={"Contact number"}
                                    name={"contactNumber"}
                                    type={"tel"}
                                    variant={"outlined"}
                                    format={"+38 (###) ###-##-##"}
                                    mask={"_"}
                                    value={this.state.inputs.contactNumber}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={"Details"}
                                    name={"details"}
                                    value={this.state.inputs.details}
                                    onChange={this.onChangeHandler}
                                    variant={"outlined"}
                                    required
                                    fullWidth
                                    rows="4"
                                    multiline
                                />
                            </Grid>
                        </Grid>
                        <Button
                            className={classes.submit}
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            fullWidth
                        >{this.props.submitText}</Button>
                    </form>
                </div>
            </Container>
        );
    }
}


export default withStyles(saveCustomerStyle)(SaveUserForm);
