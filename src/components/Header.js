import React from 'react'
import LogInAndOut from './LogInAndOut'

export default function Header() {
  return (
    <div className="header-container">
      <header>
        <img src="/images/wally.png" alt="Wally" />
        Find <span>Wally</span>
      </header>
      <LogInAndOut />
    </div>
  )
}
