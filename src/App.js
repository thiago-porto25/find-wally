import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Game from './pages/Game'
import Choose from './pages/Choose'
import Leaderboards from './pages/Leaderboards'
import Footer from './components/Footer'

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isOnLeaderboard, setIsOnLeaderboard] = useState(false)

  return (
    <div className="App">
      <Header />
      {!isGameRunning && !isOnLeaderboard ? (
        <Choose
          setIsGameRunning={setIsGameRunning}
          setIsOnLeaderboard={setIsOnLeaderboard}
        />
      ) : (
        <Leaderboards setIsOnLeaderboard={setIsOnLeaderboard} />
      )}
      {isGameRunning && (
        <Game
          setIsGameRunning={setIsGameRunning}
          setIsOnLeaderboard={setIsOnLeaderboard}
        />
      )}
      <Footer />
    </div>
  )
}

export default App
