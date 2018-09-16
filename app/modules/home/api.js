
import { auth, database, provider, storage } from "../../config/firebase";
import RNFetchBlob from 'rn-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

//Register the user using email and password
export function register(data, callback) {
    const { email, password, username } = data;
    auth.createUserWithEmailAndPassword(email, password)
        .then((resp) => createUser({ username, uid:resp.user.uid }, callback))
        .catch((error) => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser (user, callback) {
    const userRef = database.ref().child('users');

    userRef.child(user.uid).update({ ...user })
        .then(() => callback(true, user, null))
        .catch((error) => callback(false, null, {message: error}));
}

//Sign the user in with their email and password
export function login(data, callback) {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
        .then((resp) => getUser(resp.user, callback))
        .catch((error) => callback(false, null, error));
}

//Get the user object from the realtime database
export function getUser(user, callback) {
    database.ref('users').child(user.uid).once('value')
        .then(function(snapshot) {

            const exists = (snapshot.val() !== null);

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val();

            const data = { exists, user }
            callback(true, data, null);
        })
        .catch(error => callback(false, null, error));
}

//Get the other users from database
export function getOtherUsers(callback) {
    //TODO: Exclude self
    database.ref('users').once('value')
        .then(function(snapshot) {
            // snapshot.forEach(function(childSnapshot) {
            //     var childKey = childSnapshot.key;
            //     var childData = childSnapshot.val();

            //     console.warn(childData.username + ", " + childData.uid);
                
            // });

            callback(true, snapshot, null);
        })
        .catch(error => callback(false, null, error));
}

export function setUserDescription(description, callback){
    var user = auth.currentUser

    if (!user){
        callback("Cannot set user description: not logged in!")
    }
    var updates = {};
    updates['/users/' + user.uid + '/description'] = description;

    database.ref().update(updates, callback);
}

export function setProfilePicture(uri, mime = 'application/octet-stream'){
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const sessionId = new Date().getTime()
        let uploadBlob = null
        const imageRef = storage.ref('images').child(`${sessionId}`)
  
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
            // console.warn("making blob")
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
            // console.warn("upload blob")
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
            // console.warn("get download url")
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
}
// export function setProfilePicture(url, callback){
//     var user = auth.currentUser

//     if (!user){
//         callback("Cannot set user profile photo: not logged in!")
//     }

//     // 1 - Upload picture to cloud storage
//     var filePath = user.uid + '/' + picture.name;
//     return storage.ref(filePath).put(picture).then(function(fileSnapshot) {
//         // 2 - Generate a public URL for the picture.
//         return fileSnapshot.ref.getDownloadURL().then((url) => {
//         // 3 - Update user profile with url
//             var updates = {};
//             updates['/users/' + user.uid + '/profilepicture'] = url;
        
//             database.ref().update(updates, callback);
//         });
//     });
// }


//Send Password Reset Email
export function resetPassword(data, callback) {
    const { email } = data;
    auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut (callback) {
    auth.signOut()
        .then(() => {
            if (callback) callback(true, null, null)
        })
        .catch((error) => {
            if (callback) callback(false, null, error)
        });
}


//Sign user in using Facebook
export function signInWithFacebook (fbToken, callback) {
    const credential = provider.credential(fbToken);
    auth.signInWithCredential(credential)
        .then((user) => getUser(user, callback))
        .catch((error) => callback(false, null, error));
}