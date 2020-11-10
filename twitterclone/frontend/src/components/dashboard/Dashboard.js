import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuAppBar from "./MenuAppBar";
import SinglePost from "./SinglePost";
import Grid from "@material-ui/core/Grid";
import AddPost from "./AddPost";
import {AuthContext} from "../AuthContext";
import LoginPage from "./LoginPage";

export default function Dashboard(props) {
    const authContext = useContext(AuthContext);

    if(!authContext.isLoggedIn) {
        return <LoginPage/>
    }
    const posts = props.posts.map(element => {
        return(
            <SinglePost post={element}/>
        )});

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