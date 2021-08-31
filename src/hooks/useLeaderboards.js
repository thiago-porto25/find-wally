import { useState, useEffect } from 'react'
import { firestore } from '../firebase/config'

export const useLeaderboards = (collection) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const unsub = firestore
      .collection(collection)
      .orderBy('time', 'asc')
      .onSnapshot((snap) => {
        let documents = []
        snap.forEach((doc) => documents.push({ id: doc.id, ...doc.data() }))
        setData(documents)
      })

    return () => unsub()
  }, [collection])

  return data
}
