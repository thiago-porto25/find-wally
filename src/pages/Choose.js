import React from 'react'
import LevelCard from '../components/LevelCard'

export default function Choose({ levels, ...props }) {
  const handleClickToLeaderboards = () => {
    props.setIsChoosingLevel(false)
    props.setIsOnLeaderboard(true)
  }

  return (
    <div className="choose-container">
      <section className="cards-section">
        {levels &&
          levels.map((level) => (
            <LevelCard key={level.id} level={level} {...props} />
          ))}
      </section>
      <section className="button-section">
        <button onClick={handleClickToLeaderboards}>Leaderboards</button>
      </section>
    </div>
  )
}
