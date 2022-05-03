import {createContext} from 'react'

export const SelectedColorsContext = createContext({
    p1: "white",
    p2: "white",
    p3: "white",
    p4: "white",

    P1Color: (color) => {},
    P2Color: (color) => {},
    P3Color: (color) => {},
    P4Color: (color) => {},
});