import React, { useState, useRef, useEffect } from 'react'
import { findPercentage, findCoordinate } from '../helpers'
import GameHeader from '../components/GameHeader'
import SelectionBox from '../components/SelectionBox'
import SelectionMessage from '../components/SelectionMessage'
import WinnerModal from '../components/WinnerModal'

export default function Game({
  selectedLevel,
  setSelectedLevel,
  setIsGameRunning,
  setIsChoosingLevel,
}) {
  const image = useRef(null)
  const [imageIsClicked, setImageIsClicked] = useState(false)
  const [currentXY, setCurrentXY] = useState(null)

  const [selectionMsgInfo, setSelectionMsgInfo] = useState({
    visible: false,
    theme: false,
  })

  const [foundCharacters, setFoundCharacters] = useState([])
  const [time, setTime] = useState(0)

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
      setFoundCharacters([...foundCharacters, character])
      setSelectionMsgInfo({ visible: true, theme: true })
    } else setSelectionMsgInfo({ visible: true, theme: false })

    setImageIsClicked(false)
  }

  useEffect(() => {
    if (foundCharacters.length < 3) setTimeout(() => setTime(time + 1), 1000)
  }, [time])

  useEffect(() => {
    if (selectionMsgInfo.visible)
      setTimeout(
        () => setSelectionMsgInfo({ ...selectionMsgInfo, visible: false }),
        1500
      )
  }, [selectionMsgInfo.visible])

  const squareStyle = {
    transform: 'translate(-10px, -10px)',
    left: currentXY && currentXY.x,
    top: currentXY && currentXY.y,
  }

  return (
    <>
      {foundCharacters.length === 3 && (
        <WinnerModal
          selectedLevel={selectedLevel}
          time={time}
          setSelectedLevel={setSelectedLevel}
          setIsGameRunning={setIsGameRunning}
          setIsChoosingLevel={setIsChoosingLevel}
        />
      )}
      <div className="game-container">
        <GameHeader foundCharacters={foundCharacters} time={time} />
        <div className="game-inner">
          <img
            ref={image}
            onClick={handleClick}
            src={selectedLevel.url}
            alt="Game Board"
          />
          {imageIsClicked && (
            <SelectionBox
              handleSelection={handleSelection}
              foundCharacters={foundCharacters}
              currentXY={currentXY}
            />
          )}
          {imageIsClicked && (
            <div style={squareStyle} className="selection-square"></div>
          )}
          <SelectionMessage
            theme={selectionMsgInfo.theme}
            visible={selectionMsgInfo.visible}
          />
        </div>
      </div>
    </>
  )
}
