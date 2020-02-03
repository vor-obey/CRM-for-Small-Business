import React from 'react';
import {Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core";

export const UserDetails = (props) => {

    const {userDetails, classes} = props;

    return  (
        <Grid container item xs={12} className={classes.list}>
            <List>
                <ListItem>
                    <ListItemText>
                        <Typography variant="overline">
                            First Name
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {userDetails.firstName}
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Typography variant="overline">
                            Last Name
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {userDetails.lastName}
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Typography variant="overline">
                            Middle Name
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {userDetails.middleName}
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemText>
                        <Typography variant="overline">
                            Email Address
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {userDetails.email}
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Typography variant="overline">
                            Contact number
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {userDetails.contactNumber}
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Typography variant="overline">
                            Role
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {userDetails.role.name}
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </Grid>
    )
};
