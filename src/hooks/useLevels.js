import { useState, useEffect } from 'react'
import { firestore } from '../firebase/config'

const useLevels = (collection) => {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const unsub = firestore
      .collection(collection)
      .orderBy('id')
      .onSnapshot((snap) => {
        let newDocs = []
        snap.forEach((doc) => {
          newDocs.push({ docId: doc.id, ...doc.data() })
        })
        setDocs(newDocs)
      })

    return () => unsub()
  }, [collection])

  return [...docs]
}

export default useLevels
