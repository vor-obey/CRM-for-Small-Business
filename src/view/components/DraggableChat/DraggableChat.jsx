import React, {useCallback, useState} from 'react';
import Draggable from 'react-draggable';
import {ChatWrapper} from '../ChatWrapper/ChatWrapper';
import {Card, CardHeader, IconButton} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import {useDispatch, useSelector} from 'react-redux';
import {closeChatWidget} from '../../../data/store/user/userActions';
import {makeStyles} from '@material-ui/core/styles';
import {draggableChatStyles} from './DraggableChat.style';

const useStyles = makeStyles(draggableChatStyles);

export const DraggableChat = () => {
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const profile = useSelector(state => state.userReducer.igProfile);
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const isOpen = useSelector(state => state.userReducer.isChatWidgetOpened);
    const dispatch = useDispatch();

    const handleExpandClick = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    const handleCloseClick = useCallback(() => {
        dispatch(closeChatWidget());
    }, [dispatch]);

    if (!currentUser || !profile) {
        return null;
    }

    if (!isOpen) {
        return null;
    }

    return (
        <Draggable
            bounds='body'
            handle='.handler'
        >
            <Card className={classes.card}>
                <CardHeader
                    className='handler'
                    avatar={
                        <Avatar src={profile.profile_pic_url}/>
                    }
                    title={profile.username}
                    subheader={currentUser.organization.name}
                    action={
                        <>
                            <IconButton
                                onClick={handleExpandClick}
                                className={`${classes.expand} ${expanded ? classes.expandOpen : ''}`}
                            >
                                <ExpandLessIcon/>
                            </IconButton>
                            <IconButton
                                onClick={handleCloseClick}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </>
                    }
                    style={{
                        cursor: 'pointer',
                        borderBottom: '1px solid grey'
                    }}
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent
                        style={{
                            maxHeight: 600,
                            overflow: 'auto',
                            padding: 0
                        }}
                    >
                        <ChatWrapper
                            style={{
                                padding: 0,
                            }}
                        />
                    </CardContent>
                </Collapse>
            </Card>
        </Draggable>
    );
};