import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import Dropdown from './Dropdown'
import axios from 'axios'

import db from '../Firebase/FirebaseInit'
import { getDoc, doc, setDoc } from 'firebase/firestore'


import { SelectedColorsContext } from '../Contexts/SelectedColors'
import { CurrentUsersContext } from '../Contexts/CurrentUserContext'




const Playerbox = () => {
    const { P1Color, p2, p3, p4 } = React.useContext(SelectedColorsContext)
    const { CurrentUserUID, P1ColorUID, setP1ColorUID } = React.useContext(CurrentUsersContext)


    //Function for getting color from child dropdown
    const [childColor, getChildColor] = React.useState('white');


    const docRef = doc(db, 'users', CurrentUserUID);

    //runs when the UID changes, (login or logout)
    useEffect(() => {
        if (CurrentUserUID !== 'unSet') //don't write to file if there is no one logged in
        {
            axios.get(`https://firestore.googleapis.com/v1/projects/frontendadvanced-gamelobby/databases/(default)/documents/users/` + CurrentUserUID)
                .then(response => {
                    setP1ColorUID(response.data.fields.P1Color.stringValue);
                    console.log("P1Color grabbed from firestore via axios", response.data.fields.P1Color.stringValue);
                })
                .catch(error => {
                    console.log("error fetching P1: ", error);
                })

            // getDoc(docRef).then((doc) => {
            //     setP1ColorUID(doc.data().P1Color)
            // })
        }
    }, [CurrentUserUID])
    //function runs everytime child function updates color
    const changeColor = (getColor) => {
        getChildColor(getColor);
        P1Color(getColor); //update player color value context

        //update the server document  

        axios.patch(`https://firestore.googleapis.com/v1/projects/frontendadvanced-gamelobby/databases/(default)/documents/users/${CurrentUserUID}`,
        {
            //fill every field manually because for whatever reason patch inexplicably deletes the unused sections
            fields: {
                P1Color: {stringValue: getColor},
                P2Color: {stringValue: p2},
                P3Color: {stringValue: p3},
                P4Color: {stringValue: p4},
            }
        })
            .then(response => {
                console.log("File updated for P1Color", response);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }

            });


        // setDoc(docRef, { P1Color: getColor }, { merge: true })
        //     .then(() => {
        //         console.log("File updated for P1Color")
        //     })
        //     .catch((e) => {
        //         console.log("Failed to write to file: ", { e })
        //     });
    }


    return (
        <Container style={{ backgroundColor: childColor }} className='playerbox'>
            <h1>P1</h1>
            <Dropdown getColor={changeColor} UIDColor={P1ColorUID} />
        </Container>

    )
}






export default Playerbox