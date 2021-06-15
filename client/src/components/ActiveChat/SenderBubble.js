import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { Check, DoneAll } from "@material-ui/icons";
import { messageStatus } from "../../utils";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  statusBox: {
    width: "fit-content",
    alignItems: "center",
    marginBottom: 5
  },
  statusIcon: {
    width: 18,
    height: 18,
    fill: "#BECCE2",
    marginLeft: 3,
    marginBottom: 2,
  },
  messageRead: {
    fill: blue[500]
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, status } = props;
  
  return (
    <Box className={classes.root} >
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      <Grid container direction="row" className={classes.statusBox}>
        <Typography className={classes.date}>{time}</Typography>
        <Status status={status} />
      </Grid>
    </Box>
  );
};

export const Status = ({ status }) => {
  const classes = useStyles();
  switch (status) {
    case messageStatus.RECEIVED:
      return <DoneAll className={`${classes.statusIcon}`} />;
    case messageStatus.READ:
      return <DoneAll className={`${classes.statusIcon} ${classes.messageRead}`} />;
    default:
      return <Check className={`${classes.statusIcon}`} />;
  }
}

export default React.memo(SenderBubble);
