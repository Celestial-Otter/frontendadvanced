import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { CurrentUsersContext } from '../Contexts/CurrentUserContext'
import { upload } from '../Firebase/FirebaseProfilePicture'
import { getAuth } from 'firebase/auth'
const ProfilePicture = () => {

    const { CurrentUserUID } = React.useContext(CurrentUsersContext);
    const [photoURL, setPhotoURL] = useState("https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg");
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);


    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
            setPhotoURL(user.photoURL);
            // console.log(user.photoURL);
            // console.log(photoURL);
    }, [user])

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }

    }

    function handleClick() {
        upload(photo, user, setLoading)
    }



    return (
        <Box>
            <p>Current user ID: {CurrentUserUID} </p>
            <input type='file' onChange={handleChange}></input>
            <button disabled={loading || !photo} onClick={handleClick}>Upload profile picture</button>
            <img src={photoURL} alt="Profile Picture" className='profilePicture'></img>
        </Box>
    )
}

export default ProfilePicture