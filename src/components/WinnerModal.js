/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { userContext } from '../context/userContext'
import { firestore } from '../firebase/config'

export default function WinnerModal({
  time,
  selectedLevel,
  setSelectedLevel,
  setIsGameRunning,
  setIsChoosingLevel,
}) {
  const { user, setUser } = useContext(userContext)

  const handleClick = () => {
    setIsGameRunning(false)
    setIsChoosingLevel(true)
    setSelectedLevel(null)
  }

  const updateTimeInFirestore = async (level) => {
    try {
      await firestore
        .collection('users')
        .doc(user.uid)
        .update({ [`bestTimeLvl${level}`]: time })
      setUser({ ...user, [`bestTimeLvl${level}`]: time })
      console.log('record saved')
    } catch (e) {
      console.log(e.message)
    }
  }

  const updateLeaderboards = async (level, uid) => {
    try {
      let docId

      const snapshot = await firestore
        .collection(`leaderboardsLvl${level}`)
        .where('uid', '==', uid)
        .get()

      snapshot.forEach((doc) => {
        docId = doc.id
      })

      firestore
        .collection(`leaderboardsLvl${level}`)
        .doc(docId)
        .update({ time })
    } catch (e) {
      console.log(e.message)
    }
  }

  const addTimeToLeaderboards = (level, name = 'anonymous') => {
    try {
      firestore
        .collection(`leaderboardsLvl${level}`)
        .add({ displayName: name, uid: user ? user.uid : null, time })
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    const levelName = `bestTimeLvl${selectedLevel.id}`

    const handleSave = async () => {
      if (user) {
        if (user[levelName] === null || user[levelName] > time) {
          await updateTimeInFirestore(selectedLevel.id)

          if (user[levelName] === null) {
            addTimeToLeaderboards(selectedLevel.id, user.displayName)
          } else {
            updateLeaderboards(selectedLevel.id, user.uid)
          }
        } else return
      }
      if (!user) {
        console.log('no user. Saving directly to leaderboard')
        addTimeToLeaderboards(selectedLevel.id)
      }
    }
    handleSave()
  }, [])

  return (
    <div className="modal">
      <div className="modal-inner">
        <h1>Congratulations!</h1>
        <p>You've completed the level in</p>
        <h3>{time} seconds</h3>
        <button
          onClick={handleClick}
          className="modal-button modal-button-choose"
        >
          New game
        </button>
      </div>
    </div>
  )
}
