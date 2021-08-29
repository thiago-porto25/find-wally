import React from 'react'
import Logo from './Logo'

export default function GameHeader({ foundCharacters, time }) {
  return (
    <div className="time-and-found-num">
      <Logo name="game-header-logo" />
      <p className="timer">Time:{time}s</p>
      <div className="found-number">
        <p>{foundCharacters.length}</p>
      </div>
    </div>
  )
}
