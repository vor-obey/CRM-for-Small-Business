import RefreshIcon from '@material-ui/icons/Refresh';
import {ListItem} from '@material-ui/core';
import React from 'react';

export const ChatThreads = ({
                                refreshThreads,
                                renderThreads,
                                classes
                            }) => {
    return (
        <>
            <div className={classes.scroll}>
                <ListItem className={classes.flexEnd}>
                    <RefreshIcon className={classes.cursor} onClick={() => refreshThreads()}/>
                </ListItem>
                {renderThreads()}
            </div>
        </>
    );
};
