import React from 'react'

export default function LevelCard({ doc }) {
  return (
    <div className="card-container">
      <img src={`#`} alt={`preview of level ${1}`} />
      <p>description</p>
      <button>Choose Level</button>
    </div>
  )
}
