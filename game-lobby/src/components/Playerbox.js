import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import Dropdown from './Dropdown'

import db from '../Firebase/FirebaseInit'
import { getDoc, doc } from 'firebase/firestore'

import { SelectedColorsContext } from '../Contexts/SelectedColors'
import { CurrentUsersContext } from '../Contexts/CurrentUserContext'




const Playerbox = () => {
    const { P1Color } = React.useContext(SelectedColorsContext)
    const { CurrentUserUID } = React.useContext(CurrentUsersContext)

    const docRef = doc(db, 'users', CurrentUserUID);


    useEffect(() => {

            console.log("CurrentUID:", CurrentUserUID)
                // gets the passed in document once
                getDoc(docRef).then((doc) => {
                    console.log(doc.data(), doc.data().P1Color)
                    console.log("updated")
                })
    })
    
    //Getting Color from child dropdown
    const [childColor, getChildColor] = React.useState('white');
    const changeColor = (getColor) => {
        getChildColor(getColor);
        P1Color(getColor); //update player color value context
    }


    return (
        <Container style={{ backgroundColor: childColor }} className='playerbox'>
            <h1>P1</h1>
            <Dropdown getColor={changeColor} />
        </Container>

    )
}






export default Playerbox