import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles(() => ({
    ellipsis: {
        color: "#95A7C4",
        opacity: 0.8
    },
    btnMenu: {
        marginRight: 24,
    }
}));
const UserMenu = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { logout } = useAuth();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.btnMenu} aria-label="more-horizontal">
            <MoreHorizIcon classes={{ root: classes.ellipsis }} />
            </IconButton>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            elevation={2}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={() => {handleClose(); logout()}}>Logout</MenuItem>
        </Menu>
        </div>
    );
}

export default UserMenu;