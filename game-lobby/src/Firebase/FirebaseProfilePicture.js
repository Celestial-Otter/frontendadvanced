import { getAuth, updateProfile } from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"

const storage = getStorage();
//const auth = getAuth();
//const user = auth.currentUser;


export async function upload(file, currentUser, setLoading) {
    //fileRef is the reference to the storage as to where we want the file to be uploaded to
    const fileRef = ref(storage, currentUser.uid + '.png');

    setLoading(true);
    //uploadBytes uploads the file to firebase. Sending the file to the location set in fileRef
    const snapshot = await uploadBytes(fileRef, file);
    const getPhotoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, {photoURL: getPhotoURL});

    setLoading(false);
    alert("uploaded file!");
    
}
