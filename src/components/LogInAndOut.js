import React, { useContext } from 'react'
import { userContext } from '../context/userContext'
import { firestore, auth as authent, firebase } from '../firebase/config'

export default function LogInAndOut() {
  const { user, setUser } = useContext(userContext)

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await authent.signInWithPopup(provider)
    const userData = await getUser(authent.currentUser)

    if (!userData) {
      const userInfo = {
        displayName: authent.currentUser.displayName,
        photoUrl: authent.currentUser.photoURL,
        uid: authent.currentUser.uid,
        bestTime: 0,
      }
      await addNewUser(userInfo)
      const { docId } = await getUser(authent.currentUser)
      setUser({ docId, ...userInfo })
    } else {
      setUser(userData)
    }
  }

  const signOut = () => {
    setUser(null)
    authent.signOut()
  }

  const getUser = async (currentUser) => {
    let data

    await firestore
      .collection('users')
      .where('uid', '==', currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(
          (doc) => (data = { docId: doc.id, ...doc.data() })
        )
      })
      .catch((error) => console.log(`Error catching documents: ${error}`))

    return data
  }

  const addNewUser = async (userInfo) => {
    firestore.collection('users').add(userInfo)
  }

  return (
    <div className="log-container">
      {!user && (
        <button onClick={signInWithGoogle} className="log-button in">
          Log in
        </button>
      )}
      {user && (
        <>
          <img
            className="profile-picture"
            src={user?.photoUrl}
            alt={user?.displayName}
          />
          <button onClick={signOut} className="log-button out">
            Log out
          </button>
        </>
      )}
    </div>
  )
}
