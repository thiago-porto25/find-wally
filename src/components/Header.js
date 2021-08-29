import React from 'react'
import LogInAndOut from './LogInAndOut'
import Logo from './Logo'

export default function Header() {
  return (
    <div className="header-container">
      <Logo />
      <LogInAndOut />
    </div>
  )
}
