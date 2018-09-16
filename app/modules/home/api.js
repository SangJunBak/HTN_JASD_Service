
import { auth, database, provider, storage } from "../../config/firebase";

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
        .then((resp) => updateCurrentUser(resp.user, callback))
        .catch((error) => callback(false, null, error));
}

//Get the user object from the realtime database
export function updateCurrentUser(user, callback) {
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

//Get a user object
export function getUser(userID, callback) {
    database.ref('/users/' + userID).once('value')
        .then(function(snapshot) {

            const exists = (snapshot.val() !== null);

            var user = null
            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val();

            const data = { exists, user }
            callback(true, data, null);
        })
        .catch(error => callback(false, null, error));
}

//Gets all users from database. Make sure to exclude self
export function getAllUsers(callback) {
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

export function commentOnUser(comment, targetUID, callback){
    var thisUser = auth.currentUser

    if (!thisUser){
        callback("Cannot comment: not logged in!")
    }

    database.ref('/users/' + targetUID + '/comments/').push({
        text: comment,
        author: thisUser.uid
    }).then(callback(false));
}

export function rateUser(rating, targetUID, callback){
    var thisUser = auth.currentUser

    if (!thisUser){
        callback("Cannot rate: not logged in!")
    }

    //Inefficient but w/e
    database.ref('/users/' + targetUID + '/ratings/').push({
        rating: rating,
        user: thisUser.uid
    }).then(callback(false));
}

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
        .then((user) => updateCurrentUser(user, callback))
        .catch((error) => callback(false, null, error));
}