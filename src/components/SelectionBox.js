import React from 'react'

export default function SelectionBox({
  handleSelection,
  foundCharacters,
  currentXY,
}) {
  const listStyle = {
    left: currentXY && currentXY.x + 20,
    top: currentXY && currentXY.y,
    zIndex: 2,
  }

  return (
    <div style={listStyle} className="chars-list-container">
      <div
        onClick={() => handleSelection('wally')}
        className={`chars-list-item ${
          foundCharacters.includes('wally') && 'found'
        }`}
      >
        <p>Wally</p>
      </div>
      <div
        onClick={() => handleSelection('wilma')}
        className={`chars-list-item ${
          foundCharacters.includes('wilma') && 'found'
        }`}
      >
        <p>Wilma</p>
      </div>
      <div
        onClick={() => handleSelection('wizard')}
        className={`chars-list-item ${
          foundCharacters.includes('wizard') && 'found'
        }`}
      >
        <p>Wizard</p>
      </div>
    </div>
  )
}
