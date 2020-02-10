import React, {useState, useCallback, useEffect} from "react";

import {
    Paper,
    Typography,
    Container,
    makeStyles,
    Fab,
    Grid,
} from "@material-ui/core";
import { deleteUser } from "../../../data/store/user/userThunkAction";
import { userDetailsStyle } from "../UserDetailsPage/UserDetailsPage.style.js";
import {useDispatch} from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CustomDialog } from '../../components/CustomDialog/CustomDialog';
import {useParams} from 'react-router-dom';
import {UserService} from "../../../services";
import {isEmpty} from 'lodash';
import {UserDetails} from './UserDetails/UserDetails';

const useStyles = makeStyles(userDetailsStyle);

export const UserDetailsPage = (props) => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const classes = useStyles();
    const [isShow, setIsShow] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const handleOpenDialog = useCallback(() => {
        setIsShow(prevState => !prevState);
    }, []);

    useEffect(() => {
        const fetchUserById = async (id) => {
            const response = await UserService.findOneById(id);
            setUserDetails(response);
        };

        fetchUserById(id);
    }, [id]);

    const handleClickDeleteUser = useCallback(() => {
        const {history} = props;
        dispatch(deleteUser(id));
        history.push('/users');
    }, [dispatch, id, props]);

    const handleClickEdit = useCallback(() => {
        const {history} = props;
        history.push(`${id}/edit`);
    }, [id, props]);


    const renderUserDetails = useCallback(() => {
        if (isEmpty(userDetails)) {
            return null;
        }
        return <UserDetails userDetails={userDetails} classes={classes}/>
    }, [classes, userDetails]);

    return(
        <Container component="main" className={classes.allUsers}>
            <Paper className={classes.paper}>
                <Grid container item xs={12}
                      alignContent={'center'}
                      direction={'column'}
                      justify={'flex-start'}>
                    <Grid container item xs={12}
                          justify={'center'}>
                        <Typography variant="h4" className={classes.title} align="center" gutterBottom>
                            User Details
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        {renderUserDetails()}
                    </Grid>
                    <Grid  container item xs={12}
                           alignContent={'center'}
                           justify={'center'}>
                        <Fab
                            color="primary"
                            aria-label="edit"
                            size="small"
                            className={classes.fab}
                            onClick={handleClickEdit}>
                            <EditIcon />
                        </Fab>
                        <Fab
                            color="primary"
                            aria-label="edit"
                            size="small"
                            className={classes.fab}
                            onClick={handleOpenDialog}
                        >
                            <DeleteIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
            <CustomDialog
                title="Delete User"
                children="Are you sure you want to delete the user without the possibility of recovery?"
                isShow={isShow}
                onClose={handleOpenDialog}
                closeText="Disagree"
                onAction={handleClickDeleteUser}
            />
        </Container>
    );
};
