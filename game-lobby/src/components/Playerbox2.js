import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import Dropdown from './Dropdown'

import db from '../Firebase/FirebaseInit'
import { getDoc, doc, setDoc } from 'firebase/firestore'


import { SelectedColorsContext } from '../Contexts/SelectedColors'
import { CurrentUsersContext } from '../Contexts/CurrentUserContext'




const Playerbox = () => {
    const { P2Color } = React.useContext(SelectedColorsContext)
    const { CurrentUserUID, P2ColorUID, setP2ColorUID } = React.useContext(CurrentUsersContext)


    //Function for getting color from child dropdown
    const [childColor, getChildColor] = React.useState('white');


    const docRef = doc(db, 'users', CurrentUserUID);

    //runs when the UID changes, (login or logout)
    useEffect(() => {
        if (CurrentUserUID !== 'unSet') //don't write to file if there is no one logged in
        {
            getDoc(docRef).then((doc) => {
                setP2ColorUID(doc.data().P2Color)
            })
        }
    }, [CurrentUserUID])
    //function runs everytime child function updates color
    const changeColor = (getColor) => {
        getChildColor(getColor);
        P2Color(getColor); //update player color value context

        //update the server document
        setDoc(docRef, { P2Color: getColor }, { merge: true })
            .then(() => {
                console.log("File updated for P2Color")
            })
            .catch((e) => {
                console.log("Failed to write to file: ", { e })
            });
    }


    return (
        <Container style={{ backgroundColor: childColor }} className='playerbox'>
            <h1>P2</h1>
            <Dropdown getColor={changeColor} UIDColor={P2ColorUID} />
        </Container>

    )
}






export default Playerbox