import React, {useCallback, useEffect, useRef, useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {TextField} from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage} from '../../../../data/store/user/userActions';
import moment from 'moment';
import List from '@material-ui/core/List';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

export const ChatDialog = ({
                               profile,
                               thread,
                               goBack,
                               classes,
                               minWidth,
                               isDrawerOpened,
                               toggleDrawerMobile,
                               setTemplateContent,
                               templateContent
                           }) => {
    const {users, thread_title, items, inviter} = thread;
    const profile_pic_url = users[0] ? users[0].profile_pic_url : inviter.profile_pic_url;
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const {socket} = useSelector(state => state.userReducer);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (templateContent) {
            setText(templateContent);
        }
    }, [templateContent]);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView();
    }, [items]);

    let avatar = <PeopleAltIcon/>;

    if (users.length === 1) {
        avatar = <Avatar alt={thread_title} src={profile_pic_url}/>
    }

    const renderItems = useCallback(() => {
        if (!items.length) {
            return null;
        }

        const messages = items.sort((a, b) => a.timestamp - b.timestamp);
        return messages.map((item) => {
            let content;
            const date = Number(item.timestamp);
            const timestampInSeconds = moment(date).unix();
            const dateTime = moment(timestampInSeconds).format('dddd HH:mm');

            switch (item.item_type) {
                case 'text': {
                    content = (
                        <ListItemText
                            primary={item.text}
                            secondary={dateTime}
                            className={classes.messageText}
                        />
                    );
                    break;
                }
                case 'action_log': {
                    content = (
                        <ListItemText
                            primary={item.action_log.description}
                            className={classes.messageText}
                        />
                    );
                    break;
                }
                case 'media': {
                    content = (
                        <img src={item.media.image_versions2.candidates[0].url} alt="Media"
                             className={classes.messageImg}/>
                    );
                    break;
                }
                case 'raven_media': {
                    content = (
                        <img src={item.visual_media.media.image_versions2.candidates[0].url} alt="Raven Media"
                             className={classes.messageImg}/>
                    );
                    break;
                }
                case 'animated_media': {
                    content = (
                        <img src={item.animated_media.images.fixed_height.url} alt="Raven Media"
                             className={classes.messageImg}/>
                    );
                    break;
                }
                case 'media_share': {
                    content = (
                        <Card className={classes.sharedBox}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe">
                                        <img src={item.media_share.user.profile_pic_url} alt="Avatar"
                                             className={classes.sharedBoxAvatar}
                                        />
                                    </Avatar>
                                }
                                title={<Typography variant="body2">{item.media_share.user.username}</Typography>}
                            />
                            <CardMedia
                                className={classes.sharedBoxMedia}
                                image={item.media_share.image_versions2.candidates[0].url}
                                title={item.media_share.user.username}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary">
                                    {item.media_share.user.username}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" className={classes.sharedBoxCaption}>
                                    {item.media_share.caption.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                    break;
                }
                case 'like': {
                    content = (
                        <ListItemText
                            primary={item.like}
                            classes={{
                                primary: classes.like
                            }}
                        />
                    );
                    break;
                }
                case 'link': {
                    content = (
                        <ListItemText
                            primary={<Link href={item.link.text} rel="noopener"  underline="none" target='_blank'>{item.link.text}</Link>}
                            secondary={
                                <Link href={item.link.text} rel="noopener" target='_blank' underline="none" component="button" className={classes.links}>
                                    <Typography variant='body1' color="textPrimary">{item.link.link_context.link_title}</Typography>
                                    <Typography variant='body2' color="textSecondary">{item.link.link_context.link_summary}</Typography>
                                </Link>
                            }
                            className={classes.messageText}
                        />
                    );
                    break;
                }
                default: {
                    content = (
                        <ListItemText
                            primary='Unsupported content'
                            className={classes.messageUnsupported}
                            style={{
                                textAlign: `${item.user_id === profile.pk ? 'right' : 'left'}`,
                            }}
                        />
                    );
                    break;
                }
            }
            if (item.user_id === profile.pk) {
                return (
                    <ListItem key={item.item_id} className={classes.flexEnd}>
                        {content}
                        <ListItemAvatar>
                            <Avatar alt={thread_title} src={profile.profile_pic_url} style={{ marginLeft: 18}}/>
                        </ListItemAvatar>
                    </ListItem>
                );
            }
            return (
                <ListItem key={item.item_id} className={classes.flexStart}>
                    <ListItemAvatar>
                        {avatar}
                    </ListItemAvatar>
                    {content}
                </ListItem>
            )
        });
    }, [avatar, profile, items, thread_title, classes]);

    const onChangedInput = useCallback((event) => {
        const {value} = event.target;
        setText(value);
    }, []);

    const submit = useCallback((event) => {
        event.preventDefault();
        dispatch(sendMessage({text, threadId: thread.thread_id}, socket));
        setText('');
        setTemplateContent('');
    }, [text, thread.thread_id, setTemplateContent, dispatch, socket]);

    return (
        <Grid id='scroll' className={classes.listDialog} style={{
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            flexFlow: 'wrap',
            height: '100%',
            width: isDrawerOpened !== undefined && isDrawerOpened() ? (minWidth ? 'calc(50% - 77px)' : '100%') : '100%'
        }}
        >
            <Grid className={classes.dialogHeader}>
                {!minWidth ?
                    <KeyboardBackspaceIcon
                        className={classes.backButton}
                        onClick={goBack}
                    /> : null}
                <Typography>
                    {thread_title}
                </Typography>
                {!minWidth ?
                    <MoreVertIcon
                        className={classes.cursor}
                        onClick={toggleDrawerMobile}
                    />
                    : null}
            </Grid>
            <Grid style={{
                display: 'grid',
                alignItems: 'flex-end',
                width: '100%',
                overflowY: 'auto',
                height: 'calc(100% - 130px)'
            }}>
                <List>
                    {renderItems()}
                    <div ref={messagesEndRef}/>
                </List>
            </Grid>
            <Grid
                className={classes.sentBox}>
                < form
                    onSubmit={submit}
                    className={classes.form}>
                    < TextField
                        autoFocus
                        fullWidth
                        multiline
                        label='Message'
                        name='message'
                        onChange={onChangedInput}
                        value={text}
                    />
                    <IconButton type='submit'>
                        <KeyboardReturnIcon className={classes.cursor}/>
                    </IconButton>
                </form>
            </Grid>
        </Grid>
    )
};
