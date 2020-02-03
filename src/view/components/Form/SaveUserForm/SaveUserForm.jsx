import React, {Component} from 'react';
import {connect} from "react-redux";

import {
    Avatar, Button, Container,
    CssBaseline,
    FormControl,
    Grid,
    InputLabel,
    Select,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NumberFormat from 'react-number-format';
import { saveUserFormStyle } from './SaveUserForm.style';
import { getRoles  } from "../../../../data/store/user/userThunkAction";

class SaveUserForm extends Component {
    constructor(props) {
        super(props);

        let prepopulatedInput = {};

        if (props.userDetails)  {
            prepopulatedInput = {
                firstName: props.userDetails.firstName || '',
                lastName: props.userDetails.lastName || '',
                middleName: props.userDetails.middleName || '',
                contactNumber: props.userDetails.contactNumber || '',
                roleId: props.userDetails.roleId || '',
            }
        }

        this.state = {
            inputs: {
                firstName: '',
                lastName:  '',
                middleName: '',
                contactNumber: '',
                roleId: '',
                ...prepopulatedInput,
            },
            showPassword: false,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    }

    handleClickShowPassword() {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };

    renderSelect() {
        const { roles } = this.props;

        if (!roles.length) {
            return null;
        }

        return roles.map((role) => {
            return (
                <option key={role.roleId} value={role.roleId}>{role.name}</option>
            )
        });
    }

    onChangeHandler(e) {
        const inputs = {
            ...this.state.inputs,
            [e.target.name]: e.target.value,
        };
        this.setState({ inputs });

    }

    componentDidMount() {
        const {getRoles} = this.props;
        getRoles();

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
                                    label={"First Name"}
                                    name={"firstName"}
                                    variant={"outlined"}
                                    type={"text"}
                                    value={this.state.inputs.firstName}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={"Last Name"}
                                    name={"lastName"}
                                    variant={"outlined"}
                                    type={"text"}
                                    value={this.state.inputs.lastName}
                                    onChange={this.onChangeHandler}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={"Middle Name"}
                                    name={"middleName"}
                                    value={this.state.inputs.middleName}
                                    onChange={this.onChangeHandler}
                                    variant={"outlined"}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.formControl}
                                    required
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Role
                                    </InputLabel>
                                    <Select
                                        native
                                        name={"roleId"}
                                        value={this.state.inputs.roleId}
                                        onChange={this.onChangeHandler}
                                        labelWidth={40}
                                        required
                                        inputProps={{
                                            name: 'roleId',
                                        }}>
                                        <option value=""></option>
                                        {this.renderSelect()}
                                    </Select>
                                </FormControl>
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

const mapStateToProps = (state) => {
    const { roles } = state.userReducer;

    return {
        roles
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRoles: () => dispatch(getRoles()),

    }
};

export default withStyles(saveUserFormStyle)(connect(mapStateToProps, mapDispatchToProps)(SaveUserForm));
