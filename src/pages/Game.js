import React, { useState, useRef } from 'react'
import { findPercentage, findCoordinate } from '../helpers'

export default function Game({
  selectedLevel,
  setSelectedLevel,
  setIsGameRunning,
  setIsChoosingLevel,
}) {
  const image = useRef(null)
  const [imageIsClicked, setImageIsClicked] = useState(false)
  const [currentXY, setCurrentXY] = useState(null)
  const [foundCharacters, setFoundCharacters] = useState({
    wally: false,
    wilma: false,
    wizard: false,
  })

  const handleClick = (e) => {
    setImageIsClicked((prev) => !prev)
    trackUserClick(e)
  }

  const trackUserClick = (e) => {
    var rect = e.target.getBoundingClientRect()
    const x = e.clientX - Math.round(rect.left)
    const y = e.clientY - Math.round(rect.top)
    setCurrentXY({ x, y })
  }

  const handleSelection = (character) => {
    const dataX = findCoordinate(
      parseInt(selectedLevel[character].x, 10),
      image.current.width
    )
    const dataY = findCoordinate(
      parseInt(selectedLevel[character].y, 10),
      image.current.height
    )
    const result =
      currentXY.x > dataX - 20 &&
      currentXY.x < dataX + 20 &&
      currentXY.y > dataY - 20 &&
      currentXY.y < dataY + 20

    if (result) {
      setFoundCharacters({ ...foundCharacters, [character]: true })
    }

    console.log(result)

    setImageIsClicked(false)
  }

  const listStyle = {
    left: currentXY && currentXY.x + 20,
    top: currentXY && currentXY.y,
    zIndex: 2,
  }

  const squareStyle = {
    transform: 'translate(-10px, -10px)',
    left: currentXY && currentXY.x,
    top: currentXY && currentXY.y,
  }

  return (
    <div className="game-container">
      <div className="game-inner">
        <img
          ref={image}
          onClick={handleClick}
          src={selectedLevel.url}
          alt="Game Board"
        />
        {imageIsClicked && (
          <div style={listStyle} className="chars-list-container">
            <div
              onClick={() => handleSelection('wally')}
              className="chars-list-item"
            >
              <p>Wally</p>
            </div>
            <div
              onClick={() => handleSelection('wilma')}
              className="chars-list-item"
            >
              <p>Wilma</p>
            </div>
            <div
              onClick={() => handleSelection('wizard')}
              className="chars-list-item"
            >
              <p>Wizard</p>
            </div>
          </div>
        )}
        {imageIsClicked && (
          <div style={squareStyle} className="selection-square"></div>
        )}
      </div>
    </div>
  )
}
