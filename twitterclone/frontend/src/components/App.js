import React, {useEffect, useState} from "react";
import {render} from "react-dom";
import Dashboard from "./dashboard/Dashboard";
import {AuthContext} from "./AuthContext";

const Cookies = require('cookies-js');

function App() {
    const tokenFromCookie = Cookies.get('token');

    console.log(tokenFromCookie);
    const [posts, setPosts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(tokenFromCookie != null);
    const [sessionToken, setSessionToken] = useState(tokenFromCookie);

    const updatePosts = () => {
        fetch("api/posts", {
            method: 'GET',
            headers: {
                'Authorization': sessionToken,
            },
        })
            .then(response => {
                if (response.status > 400) {
                    return "[]";
                }
                return response.json();
            })
            .then(data => {
                setPosts(data);
            });
    }

    const login = (username, password) => {
        fetch("api/auth/login/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        })
            .then(response => {
                if (response.status >= 400) {
                    return "{}";
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    setSessionToken(data.token);
                    setLoggedIn(true);
                }
            }
        )
    }

    const logout = () => {
        setSessionToken(null);
        setLoggedIn(false);
    }


    useEffect(() => {
        updatePosts();
        Cookies.set('token', sessionToken, { expires: '10000' });
    }, [sessionToken]);



    return (
        <AuthContext.Provider value={{isLoggedIn: loggedIn, login: login, logout: logout, token: sessionToken}}>
            <Dashboard posts={posts} newPostAdded={updatePosts}/>
        </AuthContext.Provider>
    );
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);