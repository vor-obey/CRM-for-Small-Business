import React, {useState, useCallback, useEffect} from "react";

import {
    Paper,
    Typography,
    Container,
    makeStyles,
    Fab,
    Grid,
} from "@material-ui/core";
import {userDetailsStyle} from "./UserDetailsPage.style";
import {useDispatch} from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {CustomDialog} from '../../components/CustomDialog/CustomDialog';
import {useParams} from 'react-router-dom';
import {isEmpty} from 'lodash';
import {UserDetails} from './UserDetails/UserDetails';
import {useTranslation} from "react-i18next";
import {useManagerById} from '../../../utils/hooks/userHooks';
import {USERS} from "../../../constants/routes";
import {cleanUserDetails, deleteUser} from "../../../data/store/user/userActions";

const useStyles = makeStyles(userDetailsStyle);

export const UserDetailsPage = ({history}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const classes = useStyles();
    const [isShow, setIsShow] = useState(false);
    const {userDetails} = useManagerById(id);
    const {t} = useTranslation('');

    useEffect(() => {
        return () => {
            dispatch(cleanUserDetails());
        }
    }, [dispatch]);

    const onDeleteUser = useCallback(() => {
        dispatch(deleteUser(id));
    }, [dispatch, id]);

    const handleOpenDialog = useCallback(() => {
        setIsShow(prevState => !prevState);
    }, []);

    const handleClickEdit = useCallback(() => {
        history.push(`${USERS}/${id}/edit`);
    }, [id, history]);

    const renderUserDetails = useCallback(() => {
        if (isEmpty(userDetails)) {
            return null;
        }

        return <UserDetails userDetails={userDetails} classes={classes}/>
    }, [classes, userDetails]);

    return (
        <Container component="main" className={classes.userDetailsContainer}>
            <Paper className={classes.paper}>
                <Grid container item xs={12} className={classes.userGrid}>
                    <Grid item xs={12}>
                        <Typography variant="h5" className={classes.title}>
                            {t('USER_DETAILS')}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        {renderUserDetails()}
                    </Grid>
                    <Grid container item xs={12} className={classes.buttonContainer}>
                        <Fab
                            className={classes.buttonFab}
                            onClick={handleClickEdit}
                            color="primary"
                            aria-label="edit"
                            size="small">
                            <EditIcon/>
                        </Fab>
                        <Fab
                            className={classes.buttonFab}
                            onClick={handleOpenDialog}
                            color="primary"
                            aria-label="delete"
                            size="small">
                            <DeleteIcon/>
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
            <CustomDialog
                title={t('DELETE_USER')}
                children={t('DELETE_USER_TEXT')}
                isShow={isShow}
                onClose={handleOpenDialog}
                closeText={t('DISAGREE')}
                actionText={t('AGREE')}
                onAction={onDeleteUser}
            />
        </Container>
    );
};
