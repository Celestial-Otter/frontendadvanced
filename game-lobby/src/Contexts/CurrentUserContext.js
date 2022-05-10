import {createContext} from 'react'

export const CurrentUsersContext = createContext({
    CurrentUserUID: "unSet",
    P1ColorUID: "white",
    P2ColorUID: "white",
    P3ColorUID: "white",
    P4ColorUID: "white",
});