import React from 'react'

export default function LeaderboardsItem({ data }) {
  return data ? (
    <div className="ranking-item">
      <div className="ranking-position">
        <p>
          {data.ranking}
          {data.ranking === 1
            ? 'st'
            : data.ranking === 2
            ? 'nd'
            : data.ranking === 3
            ? 'rd'
            : 'th'}
        </p>
      </div>
      <div className="ranking-name">
        <p>{data.displayName}</p>
      </div>
      <div className="ranking-time">
        <p>{data.time} seconds</p>
      </div>
    </div>
  ) : null
}
