import React from 'react'

export default function LevelCard({ level, ...props }) {
  const handleClick = () => {
    props.setIsGameRunning(true)
    console.log(level)
  }
  return (
    <div className="card-container">
      <img src={level.url} alt={`preview of level ${level.id}`} />
      <h3>{level.mode}</h3>
      <p>{level.description}</p>
      <button onClick={handleClick}>Choose Level</button>
    </div>
  )
}
