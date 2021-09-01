import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import LevelCard from '../components/LevelCard'

export default function Choose({ levels, ...props }) {
  const handleClickToLeaderboards = () => {
    props.setIsChoosingLevel(false)
    props.setIsOnLeaderboard(true)
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  return (
    <div className="choose-container">
      <section className="cards-section">
        {!levels[0] && (
          <>
            <Skeleton
              count={1}
              width={windowWidth > 330 ? 300 : 250}
              height={windowWidth > 330 ? 350 : 380}
            />
            <Skeleton
              count={1}
              width={windowWidth > 330 ? 300 : 250}
              height={windowWidth > 330 ? 350 : 380}
            />
          </>
        )}
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
