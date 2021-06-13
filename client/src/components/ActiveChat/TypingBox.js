import React, { useEffect } from 'react';
import { Box, makeStyles, Avatar, Typography, Grow } from '@material-ui/core';
import { useTypingEvent } from '../../hooks/useTypingEvent';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },
    avatar: {
        height: 30,
        width: 30,
        marginRight: 11,
        marginTop: 6
    },
    bubble: {
        display: "flex",
        backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
        borderRadius: "0 10px 10px 10px", 
        padding: 15,
        width:"fit-content",
        '& > *': {
            display: "block",
            height: 13,
            width: 13,
            marginRight: 5,
            borderRadius: "50%",
            backgroundColor: "#fff",
            opacity: 0.5,
        }
    },
    usernameDate: {
        fontSize: 11,
        color: "#BECCE2",
        fontWeight: "bold",
        marginBottom: 5
    },
}))

const TypingBox = ({ user,  }) => {
    const classes = useStyles();
    const { isTyping } = useTypingEvent(user.id);

    useEffect(() => {
        // scroll chat container to the bottom
        const roomEl = document.getElementById("myChatRoom");
        roomEl.scrollTop = roomEl.scrollHeight;

        return () => []
    })

    if (!isTyping) return <></>;

    return (
        <Grow
            in={isTyping}
            style={{ transformOrigin: '0 0 0' }}
            {...(isTyping ? { timeout: 500 } : {})}
        >
            <Box className={classes.root}>
                <Avatar alt={user.username} src={user.photoUrl} className={classes.avatar}></Avatar>
                <Box>
                    <Typography className={classes.usernameDate}>
                        {user.username}
                    </Typography>
                    <Box className={classes.bubble}>
                        <Box component="span" />
                        <Box component="span" />
                        <Box component="span" />
                    </Box>
                </Box>
            </Box>
        </Grow>
    );
};

export default TypingBox;