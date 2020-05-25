import RefreshIcon from '@material-ui/icons/Refresh';
import {ListItem} from '@material-ui/core';
import React from 'react';
import {useDispatch} from 'react-redux';
import {setSnackBarStatus} from '../../../../data/store/auxiliary/auxiliaryActions';

export const ChatThreads = ({
                                refreshThreads,
                                renderThreads,
                                classes
                            }) => {
    const dispatch = useDispatch();
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
                    <RefreshIcon className={classes.cursor} onClick={() => dispatch(setSnackBarStatus({
                        isOpen: true,
                        message: 'feature is not implemented yet',
                        success: false
                    }))}/>
                </ListItem>
                {renderThreads()}
            </div>
        </>
    );
};
