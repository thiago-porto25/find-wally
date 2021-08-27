import React from 'react'
import { findPercentage, findCoordinate } from '../helpers'

export default function Game() {
  const trackUserClick = (e) => {
    var rect = e.target.getBoundingClientRect()
    const x = e.clientX - Math.round(rect.left)
    const y = e.clientY - Math.round(rect.top)
    const resX = findPercentage(x, e.target.width)
    const resY = findPercentage(y, e.target.height)
    console.log(resX + ',' + resY)
  }

  return <div className="game-container">Game</div>
}
