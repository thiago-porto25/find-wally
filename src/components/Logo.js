import React from 'react'

export default function Logo({ name = null, ...props }) {
  return (
    <header {...props} className={`${name}`}>
      <img src="/images/wally.png" alt="Wally" />
      Find <span>Wally</span>
    </header>
  )
}
