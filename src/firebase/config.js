import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDKmOe2HOUx0uW-lRwkuZEhtxtfc3E6tOM',
  authDomain: 'find-wally-4e3a1.firebaseapp.com',
  projectId: 'find-wally-4e3a1',
  storageBucket: 'find-wally-4e3a1.appspot.com',
  messagingSenderId: '804652898351',
  appId: '1:804652898351:web:ffc047e58bb713efe8ceda',
}

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { firestore, auth, storage, timestamp, firebase }
