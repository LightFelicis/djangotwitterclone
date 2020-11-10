import React, {useState} from 'react';
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
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "80%",
        margin: "10px",
        backgroundColor: '#f3f6f7'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#f65174',
    },
}));

export default function SinglePost(props) {
    const classes = useStyles();
    const initialColor = (props.post.liked) ? '#f65174' : '#1d3557';
    const [chosenColor, setChosenColor] = useState(initialColor);
    const like = () => {
        if (chosenColor == '#1d3557') {
            setChosenColor('#f65174');
        } else {
            setChosenColor('#1d3557');
        }
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="username" className={classes.avatar}>
                        {props.post.username[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.post.username}
                subheader={props.post.js_timestamp}
            />
            <CardContent>
                <Typography variant="h5" color="textSecondary" component="p">
                    {props.post.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={like}>
                    <FontAwesomeIcon icon={faHeart} color={chosenColor}/>
                    {props.post.likes_num}
                </IconButton>
            </CardActions>
        </Card>
    );
}