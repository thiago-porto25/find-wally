import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Game from './pages/Game'
import Choose from './pages/Choose'
import Leaderboards from './pages/Leaderboards'
import Footer from './components/Footer'
import useLevels from './hooks/useLevels'

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isOnLeaderboard, setIsOnLeaderboard] = useState(false)
  const [isChoosingLevel, setIsChoosingLevel] = useState(true)

  const [selectedLevel, setSelectedLevel] = useState(null)
  const levels = useLevels('levels')

  return (
    <div className="App">
      <Header />
      {isChoosingLevel && (
        <Choose
          setIsGameRunning={setIsGameRunning}
          setIsOnLeaderboard={setIsOnLeaderboard}
          setIsChoosingLevel={setIsChoosingLevel}
          setSelectedLevel={setSelectedLevel}
          levels={levels}
        />
      )}
      {isOnLeaderboard && (
        <Leaderboards
          setIsOnLeaderboard={setIsOnLeaderboard}
          setIsChoosingLevel={setIsChoosingLevel}
        />
      )}
      {isGameRunning && (
        <Game
          setIsGameRunning={setIsGameRunning}
          setIsChoosingLevel={setIsChoosingLevel}
          setSelectedLevel={setSelectedLevel}
          selectedLevel={selectedLevel}
        />
      )}
      <Footer />
    </div>
  )
}

export default App
