import React from 'react'

export default function Footer({ isGameRunning }) {
  return (
    <footer>
      {isGameRunning && (
        <p className="mobile-message">
          For mobiles users: It's advised to play with your device in horizontal
          position.
        </p>
      )}
      <p>
        Webpage created by{' '}
        <a href="https://github.com/thiago-porto25">Thiago Porto</a>
      </p>
    </footer>
  )
}
