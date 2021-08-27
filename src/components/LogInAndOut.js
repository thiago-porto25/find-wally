import React from 'react'

export default function LogInAndOut() {
  const user = true
  return (
    <div className="log-container">
      {user && <button className="log-button in">Log in</button>}
      {!user && (
        <>
          <button className="log-button out">Log out</button>
        </>
      )}
    </div>
  )
}
