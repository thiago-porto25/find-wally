import React from 'react'

export default function SelectionMessage({ theme, visible }) {
  const style = { opacity: visible ? 1 : 0 }
  return (
    <div
      style={style}
      className={`selection-message ${theme ? 'correct' : 'incorrect'}`}
    >
      {theme ? (
        <>
          <p>You've found a character!</p>
        </>
      ) : (
        <>
          <p>Keep Searching!</p>
        </>
      )}
    </div>
  )
}
