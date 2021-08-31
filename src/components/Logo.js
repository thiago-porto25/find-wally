import React from 'react'

export default function Logo({ name = null, ...props }) {
  const style = { pointerEvents: name ? 'none' : 'all' }
  return (
    <header {...props} style={style} className={`${name}`}>
      <img src="/images/wally.png" alt="Wally" />
      Find <span>Wally</span>
    </header>
  )
}
