import React from 'react'
import LogInAndOut from './LogInAndOut'
import Logo from './Logo'

export default function Header({ setIsChoosingLevel, setIsOnLeaderboard }) {
  const handleClick = () => {
    setIsOnLeaderboard(false)
    setIsChoosingLevel(true)
  }
  return (
    <div className="header-container">
      <Logo onClick={handleClick} />
      <LogInAndOut />
    </div>
  )
}
