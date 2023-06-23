import { doc, setDoc, getDocs, getDoc, collection } from "firebase/firestore";
import { db, firestoreDB } from '../utils/services/firebase';

const collectionReference = 'requests';

function upload(request) {
    const id = request.order

    if (request === null) {
        console.log('nope the request object empty bruv');
    } else {
        try {
            setDoc(doc(db, collectionReference, id), request)
            console.log('request successfully posted !')
            navigation.navigate('complete')
        } catch (error) {
            console.log({ error: error.message })
        }
    }
}

export { upload }