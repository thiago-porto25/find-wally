import React from 'react'

export default function WinnerModal({
  time,
  selectedLevel,
  setSelectedLevel,
  setIsGameRunning,
  setIsChoosingLevel,
}) {
  const handleClick = () => {
    // use selectedLevel to know which level is being played to save time
    // if user not logged save directly to leaderboard with name anonymous
    // do firebase stuff to see check if its the players best time if logged in
    // if is players first time record it as best on user and leaderboard
    // if new best time record it on user and on leaderboard
    // if not best time do nothing

    setIsGameRunning(false)
    setIsChoosingLevel(true)
    setSelectedLevel(null)
  }

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
