import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {Menu, MenuItem, ListItemText, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);



function Hamburger() {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = event => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = (path) => {
            setAnchorEl(null);
            // this.props.history.push(path);
        };


        return (
            <div>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    // variant="contained"
                    // color="white"
                    onClick={handleClick}
                >
                    <MenuIcon />
                </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem
                        button
                        component={Link}
                        to="/">
                        <ListItemText
                            color="inherit"
                            primary="Home"
                            onClick={handleClose}
                             ><Route exact path="/"/>
                        </ListItemText>
                    </StyledMenuItem>
                    <StyledMenuItem
                        button
                        component={Link}
                        to="/login">
                        <ListItemText
                            primary="Login"
                            onClick={handleClose}
                        />
                    </StyledMenuItem>
                    <StyledMenuItem
                        button
                        component={Link}
                        to="/admin">
                        <ListItemText
                            primary="Admin"
                            onClick={handleClose}
                        />
                    </StyledMenuItem>
                    <StyledMenuItem
                        button
                        component={Link}
                        to="/logout">
                        <ListItemText
                            primary="Logout"
                            onClick={handleClose}
                        />
                    </StyledMenuItem>
                </StyledMenu>
            </div>
        );
    }
export default withRouter(Hamburger);
