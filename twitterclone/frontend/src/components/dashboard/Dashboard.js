import React, {useContext} from 'react';
import MenuAppBar from "./MenuAppBar";
import SinglePost from "./SinglePost";
import Grid from "@material-ui/core/Grid";
import AddPost from "./AddPost";
import {AuthContext} from "../AuthContext";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";

export default function Dashboard(props) {
    const authContext = useContext(AuthContext);

    if (!authContext.isLoggedIn) {
        return <LandingPage/>
    }
    const posts = props.posts.map(element => {
        return (
            <SinglePost post={element} key={element.id}/>
        )
    });

    return (
        <div>
            <div>
                <MenuAppBar/>
            </div>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <AddPost newPostAdded={props.newPostAdded}/>
                {posts}
            </Grid>
        </div>
    )
}
