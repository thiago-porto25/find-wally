/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { findCoordinate } from '../helpers'
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
  const [time, setTime] = useState(0)
  const [intervalId, setIntervalId] = useState('')

  const image = useRef(null)
  const [imageIsClicked, setImageIsClicked] = useState(false)

  const [currentXY, setCurrentXY] = useState(null)
  const [foundCharacters, setFoundCharacters] = useState([])
  const [selectionMsgInfo, setSelectionMsgInfo] = useState({
    visible: false,
    theme: false,
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
      setFoundCharacters([...foundCharacters, character])
      setSelectionMsgInfo({ visible: true, theme: true })
    } else setSelectionMsgInfo({ visible: true, theme: false })

    setImageIsClicked(false)
  }

  useEffect(() => {
    //setting up the interval//
    let intervalTime = 0
    const interval = setInterval(() => {
      setTime(intervalTime + 1)
      ++intervalTime
    }, 1000)
    setIntervalId(interval)
  }, [])

  useEffect(() => {
    //removing the interval when the condition is met//
    if (foundCharacters.length >= 3) clearInterval(intervalId)
  }, [foundCharacters])

  useEffect(() => {
    //handling the message if the characters selected is correct or not//
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="game-container"
      >
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0 }}
              style={squareStyle}
              className="selection-square"
            ></motion.div>
          )}
          <SelectionMessage
            theme={selectionMsgInfo.theme}
            visible={selectionMsgInfo.visible}
          />
        </div>
      </motion.div>
    </>
  )
}
