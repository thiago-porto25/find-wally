import React from 'react'
import { motion } from 'framer-motion'

export default function LevelCard({
  level,
  setSelectedLevel,
  setIsGameRunning,
  setIsChoosingLevel,
}) {
  const handleClick = () => {
    setIsGameRunning(true)
    setIsChoosingLevel(false)
    setSelectedLevel(level)
  }
  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0 }}
      className="card-container"
    >
      <img src={level.url} alt={`preview of level ${level.id}`} />
      <h3>{level.mode}</h3>
      <p>{level.description}</p>
      <div className="characters-container">
        <img src="/images/characters/wally.png" alt="Wally" />
        <img src="/images/characters/wilma.png" alt="Wilma" />
        <img src="/images/characters/wizard.png" alt="Wizard" />
      </div>
    </motion.div>
  )
}
