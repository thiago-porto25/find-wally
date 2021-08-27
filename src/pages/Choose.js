import React, { useEffect, useState } from 'react'
import LevelCard from '../components/LevelCard'

export default function Choose({ levels, ...props }) {
  return (
    <div className="choose-container">
      <section className="cards-section">
        {levels &&
          levels.map((level) => (
            <LevelCard key={level.id} level={level} {...props} />
          ))}
      </section>
      <section className="button-section">
        <button>Leaderboards</button>
      </section>
    </div>
  )
}
