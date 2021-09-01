import React, { useContext } from 'react'
import { userContext } from '../context/userContext'
import { firestore, auth as authent, firebase } from '../firebase/config'
import { motion } from 'framer-motion'

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
        bestTimeLvl1: null,
        bestTimeLvl2: null,
      }
      await addNewUser(userInfo)
      setUser(userInfo)
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
        querySnapshot.forEach((doc) => (data = { ...doc.data() }))
      })
      .catch((error) => console.log(`Error catching documents: ${error}`))

    return data
  }

  const addNewUser = async (userInfo) => {
    firestore.collection('users').doc(authent.currentUser.uid).set(userInfo)
  }

  return (
    <div className="log-container">
      {!user && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0 }}
          onClick={signInWithGoogle}
          className="log-button in"
        >
          Log in
        </motion.button>
      )}
      {user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0 }}
          className="logged-in-container"
        >
          <img
            className="profile-picture"
            src={user?.photoUrl}
            alt={user?.displayName}
          />
          <button onClick={signOut} className="log-button out">
            Log out
          </button>
        </motion.div>
      )}
    </div>
  )
}
