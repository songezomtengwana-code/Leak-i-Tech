import React from 'react'
import { Alert } from 'react-native';
import { auth, db, firebase, firestoreDB, storageDB } from './firebase';
import { collection, doc, setDoc, getDocs, where, query, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { deleteUser, sendEmailVerification, sendPasswordResetEmail, updateProfile } from 'firebase/auth';

const auth_user = auth.currentUser;
let _user;
let user_refrence;
let _requests_collection;
let _image;

/**
 * @desc processes user identity with firebase authentication
 * @param email 
 * @param password 
*/
const authenticate_user = (email, password, fullname) => {
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(UC => {
            const user = UC.user;
            updateProfile(user, {
                displayName: fullname,
            }).then(() => {
                console.log(auth.currentUser)
            }).catch((error) => {
                console.log(error)
            });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Warning', 'the email already exists with an account');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Invalid Email', 'please check your email formatting');
            } else {
                console.error(error);
            }
        });

    sendEmailVerification(auth.currentUser).then(() => {
        console.log(auth.currentUser);
    })
}

/**
 * @desc generates a user object on the firestore to refrence for user additional information
 * @param {object} user 
 * 
 * @tests passed
 */
const store_user = (user) => {
    console.log('CONNECTING TO DB | ● ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ [10%]')

    if (user) {
        user_refrence = user;
        // initialize the document to push to firestore
        const doc_ref = doc(firestoreDB, 'users', `${user_refrence.fullname}`)

        // check if user account woth the same username was created
        db.collection('users')
            .doc(`${user_refrence.fullname}`)
            .get()
            .then(documentSnapshot => {
                console.log('user exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    return Alert.alert('Fullname already exists', 'It seems that your selected username already has an account')

                } else {
                    return setDoc(doc_ref, user_refrence)
                        .then(() => { console.log('COMPLETE | ● ● ● ● ● ● ● ● ● ● [100%]') }
                        )
                }
            });
    } else {
        user_refrence = undefined;
        console.log(`no user info was retrieved, please try again - ${Date().toLowerCase()}`)
    }

}

/**
 * @desc retrieves user information from the database using user email
 * @param user 
 */
const get_store_user = () => {
    db.collection('users')
        .doc(`${auth.currentUser.displayName}`)
        .get()
        .then(documentSnapshot => {
            console.log('response: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
                _user = documentSnapshot.data();
                console.log('_user: ' + _user)
            }
        });
}

/**
 * @desc queries for the password reset request 
 * @param email 
 */
const reset_password = (email) => {
    if (email.length < 1) {
        Alert.alert('Problem', 'Please enter a valid email address');
    } else {
        console.log('0.000%')
        sendPasswordResetEmail(auth, email).then(() => {
            console.log('email has been sent');
            Alert.alert('Successfull', 'Please check your email, click back button for login screen')
            console.log('100.000%');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            Alert.alert('Problem', 'It seems we dont have a user with the email ' + email)
            // ..
        });
    }
}

/**
 * 
 * @param payload request object containing fully filled values - undefined is not acceptable
 * @param image 
 */
const post_request = (payload) => {
    console.log('---- post request is starting ----')
    console.log(payload)
    payload_refrence = payload;

    // initialize the document to push to firestore
    const doc_ref = doc(firestoreDB, 'requests', `${payload.order}`)
    setDoc(doc_ref, payload_refrence)
        .then(() => {
            console.log('---- post request complete')

        }
        ).catch((error) => {
            console.log('---- post request failed ----')
        })
}

const upload_to_storage = async (image) => {
    if (image) {
        const response = await fetch(image.uri)
        const blob = response.blob()
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)
        var ref = firebase.storage().ref().child(filename).put(blob)
        try {
            await ref;
        } catch (e) {
            console.log(e)
        }
        console.log('image added')
    } else {
        console.log('please load an image to upload')
    }

}

/**
 * @desc collects all the 
 */
const get_requests = async () => {
    const q = query(collection(db, "requests"));
    const querySnapshot = await getDocs(q);
    _requests_collection = querySnapshot
}

const get_storage_image = (name) => {
    getDownloadURL(
        ref(storageDB, name)
    ).then((url) => {
        _image = url
        console.log(`image: ${_image}`)
    }).catch((error) => {
        console.log('unable to get image');
    })
}

/**
 * @desc deletes the logged in users request by document id 
 * @param document_id 
 */
const user_delete_request = async (document_id) => {
    await deleteDoc(doc(db, "requests", `${document_id}`)).then(() => {
        console.log(`document with ${document_id} was deleted successfully`)
    })
}

/**
 * @desc deletes the main user account plus their authentication
 * @param user_name 
 */
const user_delete_account = async (user_name) => {
    await deleteDoc(doc(db, 'users', `${user_name}`)).then(() => {
        console.log('user deleted from database')

        deleteUser(auth.currentUser).then(() => {
            console.log('user has been deleted')
        }).catch((error) => {
            console.log('report: ' + error)
        })

    }).catch((e) => {
        console.log('db user delete report: ' + e)
        return;
    })
}

const user_push_notifications = async (payload) => {
    const username = auth.currentUser.displayName;
    const matter = payload;
    const notification_string = `🙌 Thank You For Your Report ${username}, The Matter On ${matter} Will Be Looked Over And A Response Will Be Sent In A 🕗 Period Of 1 Week`;

    const notification_object = {
        id: Date.now(),
        body: {
            sender: 'Report Received - SAMS',
            senderEmail: 'sams.mun.project@gmail.com',
            content: notification_string
        },
        sentOn: Date(),
        readStatus: false,
    }

    const user_ref = doc(db, "users", username);

    await updateDoc(user_ref, {
        notifications: arrayUnion(notification_object)
    })
}

const get_notifications_list = async () => {

}
export { store_user, authenticate_user, get_store_user, reset_password, post_request, upload_to_storage, get_requests, get_storage_image, user_delete_request, user_push_notifications, _user, _requests_collection, _image }