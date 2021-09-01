import React from 'react'
import { useLeaderboards } from '../hooks/useLeaderboards'
import LeaderboardsItem from '../components/LeaderboardsItem'
import Skeleton from 'react-loading-skeleton'
import { motion } from 'framer-motion'

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
        <motion.div layout className="ranking-grid">
          {DefaultRankingItem}
          {dataLvl1 ? (
            dataLvl1.map((item, i) => (
              <LeaderboardsItem
                key={`${item.displayName}-${i}-lvl1`}
                data={{ ranking: i + 1, ...item }}
              />
            ))
          ) : (
            <Skeleton count={1} height={50} />
          )}
        </motion.div>
      </div>
      <div className="level-section">
        <header>Hard Level</header>
        <motion.div layout className="ranking-grid">
          {DefaultRankingItem}
          {dataLvl2 ? (
            dataLvl2.map((item, i) => (
              <LeaderboardsItem
                key={`${item.displayName}-${i}-lvl2`}
                data={{ ranking: i + 1, ...item }}
              />
            ))
          ) : (
            <Skeleton count={1} height={50} />
          )}
        </motion.div>
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
