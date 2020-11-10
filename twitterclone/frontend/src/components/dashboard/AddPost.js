import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import withStyles from "@material-ui/core/styles/withStyles";
import {AuthContext} from "../AuthContext";

const CssTextField = withStyles({
    root: {
        backgroundColor: '#fcfcfc',
        width: "100%",
        '& label.Mui-focused': {
            color: '#2E3B55',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#2E3B55',
            },
            '&:hover fieldset': {
                borderColor: '#2E3B55',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2E3B55',
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f3f6f7',
        width: "80%",
        margin: "10px",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#3d405b',
    },
}));

export default function AddPost(props) {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const [content, setContent] = useState(null);

    const sendPost = () => {
        fetch("api/posts/create/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({creator_token: authContext.token, post_content: content, timestamp: Math.floor(Date.now()/1000)})})
            .then(response => {
                if (response.status >= 400) {
                    return;
                }
                props.newPostAdded();
            })
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <CssTextField id="outlined-basic" label="Ćwierknij coś!" variant="outlined" onChange={(newData)=>{setContent(newData.target.value)}} fullWidth/>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={sendPost}>
                    <FontAwesomeIcon icon={faPaperPlane} color="#457b9d"/>
                </IconButton>
            </CardActions>
        </Card>
    );
}