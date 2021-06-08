import { makeStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator"
import { grey } from "@material-ui/core/colors";

export const useAuthStyle = makeStyles((theme) => ({
    root: {
        boxSizing: "border-box",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        margin: 0,
        display: "flex",
        [theme.breakpoints.up('md')]: {
            position: "absolute",
            justifyContent: "space-between",
            flexWrap: "no-wrap",
            width: "100vw",
            height: "100vh",
        },
    },
    sidebox: {
        display: "none",
        [theme.breakpoints.up('md')]: {
            display: "block",
            position: "relative",
            width: "30%",
            height: "100vh",
        }
    },
    sideboxTextContainer: {   
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: fade(theme.palette.primary.main, 0.5),
        color: "#ffffff",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    sideboxText: {   
        color: "#ffffff",
        fontWeight: "lighter",
        fontSize: "1.5rem",
        marginTop: 30
    },
    image: {
        maxWidth: "100%",
        maxHeight: "100%",
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    mainContent: {
        width: "100%",
        height: "100%",
        padding: theme.spacing(2),
        display: "flex",
        flexWrap: "no-wrap",
        position: "relative",

        [theme.breakpoints.up('sm')]: {
            height: "100vh",
        },
        [theme.breakpoints.up('md')]: {
            display: "block",
            width: "70%",
            height: "100vh",
        }
    },
    header: {
        display: "flex",
        alignItems: "center",
        marginTop: 15,
    },
    typo: {
        color: grey[400],
        marginRight: 30,
    },
    formContainer: {
        width: "95%",
        marginTop: theme.spacing(7),
        
        [theme.breakpoints.up('sm')]: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
        },
        [theme.breakpoints.up('md')]: {
            width: "60%",
        },
        [theme.breakpoints.up('lg')]: {
            width: "35%",
        }
    },
    formTitle: {
        fontSize: "2rem",
    },
    form: {},
    fieldset: {
        marginBottom: 35
    },
}))