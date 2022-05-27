import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import Dropdown from './Dropdown'
import axios from 'axios'

import db from '../Firebase/FirebaseInit'
import { getDoc, doc, setDoc } from 'firebase/firestore'


import { SelectedColorsContext } from '../Contexts/SelectedColors'
import { CurrentUsersContext } from '../Contexts/CurrentUserContext'




const Playerbox = () => {
    const { P2Color, p1, p3, p4 } = React.useContext(SelectedColorsContext)
    const { CurrentUserUID, P2ColorUID, setP2ColorUID } = React.useContext(CurrentUsersContext)


    //Function for getting color from child dropdown
    const [childColor, getChildColor] = React.useState('white');


    const docRef = doc(db, 'users', CurrentUserUID);

    //runs when the UID changes, (login or logout)
    useEffect(() => {
        if (CurrentUserUID !== 'unSet') //don't write to file if there is no one logged in
        {
            // axios.get(`https://firestore.googleapis.com/v1/projects/frontendadvanced-gamelobby/databases/(default)/documents/users/` + CurrentUserUID)
            //     .then(response => {
            //         setP2ColorUID(response.data.fields.P2Color.stringValue);
            //         console.log("P2Color grabbed from firestore via axios", response.data.fields.P2Color.stringValue);
            //     })
            //     .catch(error => {
            //         console.log("error fetching P2: ", error);
            //     })

            axios.get("http://localhost:3001/users/getUserData", {params: {uid: CurrentUserUID} })
            .then(response => {
                setP2ColorUID(response.data[0].p2color);
                console.log("updated p1color from postgres");
            })
            .catch(error => {
                console.log("error fetching p2color", error);
            })


            // getDoc(docRef).then((doc) => {
            //     setP2ColorUID(doc.data().P2Color)
            // })
        }
    }, [CurrentUserUID])
    //function runs everytime child function updates color
    const changeColor = (getColor) => {
        getChildColor(getColor);
        P2Color(getColor); //update player color value context

        //update the server document
        // axios.post('https://us-central1-frontendadvanced-gamelobby.cloudfunctions.net/updatePlayerColor', {
        //     UID: CurrentUserUID,
        //     playerNumber: 'P2Color',
        //     playerColor: getColor

        // })
        // .then(response => {
        //     console.log(response);
        // })

        const playerField = 'P2Color';
        axios.post('http://localhost:3001/users/updateUser', {
            playerField, getColor, CurrentUserUID
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
        // axios.patch(`https://firestore.googleapis.com/v1/projects/frontendadvanced-gamelobby/databases/(default)/documents/users/${CurrentUserUID}?updateMask.fieldPaths=P2Color`,
        // {
        //     fields: {
        //         P2Color: {stringValue: getColor},
        //     }
        // })
        //     .then(response => {
        //         console.log("File updated for P2Color", response);
        //     })
        //     .catch(error => {
        //         if (error.response) {
        //             // The request was made and the server responded with a status code
        //             // that falls out of the range of 2xx
        //             console.log(error.response.data);
        //         } else if (error.request) {
        //             console.log(error.request);
        //         } else {
        //             console.log("Error", error.message);
        //         }

        //     });
        // setDoc(docRef, { P2Color: getColor }, { merge: true })
        //     .then(() => {
        //         console.log("File updated for P2Color")
        //     })
        //     .catch((e) => {
        //         console.log("Failed to write to file: ", { e })
        //     });
    }


    return (
        <Container style={{ backgroundColor: childColor }} className='playerbox'>
            <h1>P2</h1>
            <Dropdown getColor={changeColor} UIDColor={P2ColorUID} />
        </Container>

    )
}






export default Playerbox