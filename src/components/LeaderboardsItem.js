import React from 'react'

export default function LeaderboardsItem({ data }) {
  const handleName = (name) => {
    let nameArr = []

    const splitName = name.split(' ')
    splitName.forEach((item) => {
      nameArr.push(item[0].toUpperCase() + item.slice(1))
    })

    return name.length <= 13
      ? nameArr.join(' ')
      : nameArr.join(' ').split('').slice(0, 12).join('') + '...'
  }

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
        <p>{handleName(data.displayName)}</p>
      </div>
      <div className="ranking-time">
        <p>{data.time}s</p>
      </div>
    </div>
  ) : null
}
