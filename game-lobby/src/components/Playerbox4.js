import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import Dropdown from './Dropdown'
import axios from 'axios'

import db from '../Firebase/FirebaseInit'
import { getDoc, doc, setDoc } from 'firebase/firestore'


import { SelectedColorsContext } from '../Contexts/SelectedColors'
import { CurrentUsersContext } from '../Contexts/CurrentUserContext'




const Playerbox = () => {
    const { P4Color, p1, p2, p3 } = React.useContext(SelectedColorsContext)
    const { CurrentUserUID, P4ColorUID, setP4ColorUID } = React.useContext(CurrentUsersContext)


    //Function for getting color from child dropdown
    const [childColor, getChildColor] = React.useState('white');


    const docRef = doc(db, 'users', CurrentUserUID);

    //runs when the UID changes, (login or logout)
    useEffect(() => {
        if (CurrentUserUID !== 'unSet') //don't write to file if there is no one logged in
        {
            // axios.get(`https://firestore.googleapis.com/v1/projects/frontendadvanced-gamelobby/databases/(default)/documents/users/` + CurrentUserUID)
            // .then(response => {
            //     setP4ColorUID(response.data.fields.P4Color.stringValue);
            //     console.log("P4Color grabbed from firestore via axios", response.data.fields.P4Color.stringValue);
            // })
            // .catch(error => {
            //     console.log("error fetching P4: ", error);
            // })

            axios.get("http://localhost:3001/users/getUserData", {params: {uid: CurrentUserUID} })
            .then(response => {
                setP4ColorUID(response.data[0].p4color);
                console.log("updated p4color from postgres");
            })
            .catch(error => {
                console.log("error fetching p4color", error);
            })


            // getDoc(docRef).then((doc) => {
            //     setP4ColorUID(doc.data().P4Color)
            // })
        }
    }, [CurrentUserUID])
    //function runs everytime child function updates color
    const changeColor = (getColor) => {
        getChildColor(getColor);
        P4Color(getColor); //update player color value context

        //update the server document
        // axios.post('https://us-central1-frontendadvanced-gamelobby.cloudfunctions.net/updatePlayerColor', {
        //     UID: CurrentUserUID,
        //     playerNumber: 'P4Color',
        //     playerColor: getColor

        // })
        // .then(response => {
        //     console.log(response);
        // })


        const playerField = 'P4Color';
        axios.post('http://localhost:3001/users/updateUser', {
            playerField, getColor, CurrentUserUID
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
        // axios.patch(`https://firestore.googleapis.com/v1/projects/frontendadvanced-gamelobby/databases/(default)/documents/users/${CurrentUserUID}?updateMask.fieldPaths=P4Color`,
        // {
        //     fields: {
        //         P4Color: {stringValue: getColor},
        //     }
        // })
        //     .then(response => {
        //         console.log("File updated for P4Color", response);
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

        // setDoc(docRef, { P4Color: getColor }, { merge: true })
        //     .then(() => {
        //         console.log("File updated for P4Color")
        //     })
        //     .catch((e) => {
        //         console.log("Failed to write to file: ", { e })
        //     });
    }


    return (
        <Container style={{ backgroundColor: childColor }} className='playerbox'>
            <h1>P4</h1>
            <Dropdown getColor={changeColor} UIDColor={P4ColorUID} />
        </Container>

    )
}






export default Playerbox