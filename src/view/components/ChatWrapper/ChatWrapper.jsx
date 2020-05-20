import React, {useCallback, useEffect, useState} from 'react';
import {Container} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {chatWrapperStyles} from "./ChatWrapper.style";
import {StorageService} from '../../../services';
import {ChatEnter} from './ChatEnter/ChatEnter';
import {Chat} from './Chat/Chat';

const useStyles = makeStyles(chatWrapperStyles);

export const ChatWrapper = () => {
    const [connectToChat, setConnectToChat] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const connect = JSON.parse(StorageService.getChatConnection());
        setConnectToChat(!!connect);
    }, []);

    const setConnectionHandler = useCallback((value) => {
        setConnectToChat(value);
    }, []);

    return (
        <Container className={classes.container}>
            {!connectToChat ? (
                <ChatEnter
                    setConnection={setConnectionHandler}
                />
            ) : (
                <Chat
                    classes={classes}
                    setConnection={setConnectionHandler}
                />
            )}
        </Container>
    );
};
