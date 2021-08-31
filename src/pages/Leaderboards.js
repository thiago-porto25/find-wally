import React from 'react'
import { useLeaderboards } from '../hooks/useLeaderboards'
import LeaderboardsItem from '../components/LeaderboardsItem'

export default function Leaderboards({
  setIsChoosingLevel,
  setIsOnLeaderboard,
}) {
  const dataLvl1 = useLeaderboards('leaderboardsLvl1')
  const dataLvl2 = useLeaderboards('leaderboardsLvl2')

  const handleClickToChoose = () => {
    setIsOnLeaderboard(false)
    setIsChoosingLevel(true)
  }

  const DefaultRankingItem = (
    <div className="ranking-label">
      <div className="default-position">Position</div>
      <div className="default-name">Name</div>
      <div className="default-time">Time</div>
    </div>
  )

  return (
    <div className="leaderboards-container">
      <h1 className="leaderboards-title">
        Leaderboards
        <hr />
      </h1>
      <div className="level-section">
        <header>Easy Level</header>
        <div className="ranking-grid">
          {DefaultRankingItem}
          {dataLvl1 &&
            dataLvl1.map((item, i) => (
              <LeaderboardsItem
                key={`${item.displayName}-${i}-lvl1`}
                data={{ ranking: i + 1, ...item }}
              />
            ))}
        </div>
      </div>
      <div className="level-section">
        <header>Hard Level</header>
        <div className="ranking-grid">
          {DefaultRankingItem}
          {dataLvl2 &&
            dataLvl2.map((item, i) => (
              <LeaderboardsItem
                key={`${item.displayName}-${i}-lvl2`}
                data={{ ranking: i + 1, ...item }}
              />
            ))}
        </div>
      </div>
      <button
        className="leaderboards-home-button"
        onClick={handleClickToChoose}
      >
        Go Home
      </button>
    </div>
  )
}
