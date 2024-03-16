import React from 'react';
import Home from "./HomePage"
import PageForGameDescription from "./PageForGameDescription"
import CreateGamePage from "./CreateGamePage"
// @ts-ignore //Routes have error, but still work. Ignore this.
import { Route, Routes } from 'react-router-dom' 
import './App.css';
import { createTheme } from '@mui/material/styles';


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const categories = [
    "Chill",
    "Active",
    "Team Building",
    "Card Game",
    "Outdoor",
    "Indoor",
]

export const durations = [
    "Quick",
    "Medium",
    "Long",
    "All day",
]

export function getCategoryList(map: boolean[]) {
    if (!map) return [];
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
