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
                <ListItem style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    borderBottom: '1px solid #B7BFC4',
                    backgroundColor: 'white'
                }}>
                    <RefreshIcon className={classes.cursor} onClick={() => refreshThreads()}/>
                </ListItem>
                {renderThreads()}
            </div>
        </>
    );
};
