import React from 'react';
import Home from "./pages/HomePage"
import PageForGameDescription from "./pages/PageForGameDescription"
import CreateGamePage from "./pages/CreateGamePage"
// @ts-ignore //Routes have error, but still work. Ignore this.
import { Route, Routes } from 'react-router-dom' 
import './App.css';

export const categories = [
    "Chill",
    "Active",
    "Team Building",
    "Card Game",
    "Outdoor",
    "Indoor",
]

export function getCategoryList(map: boolean[]) {
    let output = [];
    for (let i = 0; i < map.length; i++) {
        if (map[i]) {
            output.push(categories[i]);
        }
    }
    return output;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/games/:gameId" element={<PageForGameDescription />}/>
        <Route path="/createGame" element={<CreateGamePage />}/>
      </Routes>
    </>

  );
}

export default App;
