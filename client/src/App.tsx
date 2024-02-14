import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GamePage from './GamePage/GamePage.tsx'

function App() {
  const [count, setCount] = useState(0)

  // Just an example. Not sure ab the datatypes, but should they shouldn't be that hard to change
  const gameExample = {
    title: 'GameName',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Enim eu turpis egestas pretium aenean pharetra magna ac. Quis varius quam quisque id diam vel quam elementum. Aliquet enim tortor at auctor. Eu tincidunt tortor aliquam nulla facilisi cras. Enim diam vulputate ut pharetra sit amet aliquam. Dictum varius duis at consectetur lorem donec massa. Netus et malesuada fames ac turpis egestas integer. Elementum facilisis leo vel fringilla est ullamcorper. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Dolor sit amet consectetur adipiscing. A lacus vestibulum sed arcu non odio. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Dictumst vestibulum rhoncus est pellentesque. Vel turpis nunc eget lorem dolor sed. Nunc sed blandit libero volutpat!',
    numPlayers: '1-6',
    duration: '1-5 hours',
    equipments: ['dice','timer','paper'],
    categories: 'dice game'
  }

  return (
    <>
      <div>
        <GamePage title={gameExample.title} gameText={gameExample.description} numPlayers = {gameExample.numPlayers}
        duration={gameExample.duration} equipments={gameExample.equipments} categories={gameExample.categories}/>

        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
