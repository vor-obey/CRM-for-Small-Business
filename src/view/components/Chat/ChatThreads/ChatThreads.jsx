import RefreshIcon from '@material-ui/icons/Refresh';
import {ListItem} from '@material-ui/core';
import React from 'react';

export const ChatThreads = ({
                                refreshThreads,
                                renderThreads
                            }) => {
    return (
        <>
            <ListItem style={{justifyContent: 'flex-end'}}>
                <RefreshIcon style={{cursor: 'pointer'}} onClick={() => refreshThreads()}/>
            </ListItem>
            {renderThreads()}
        </>
    );
};