import {createContext} from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: (username, password) => {
    },
    logout: () => {
    },
    register: (username, password) => {
    }
});