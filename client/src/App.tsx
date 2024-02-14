import { useState } from 'react'
import './App.css'
import { LoginButton } from './LoginRegisterMenu/LoginButton.tsx'
import LoginMenu from './LoginRegisterMenu/LoginMenu.tsx'
import { Search } from './SearchBar/Search.tsx'
import {Title} from './Title/Title.tsx'
import { CategoryDropdown } from './CategoryDropdown/CategoryDropdown.tsx'

import { AuthUI, CurrentUserDataProvider } from "./firebase/auth"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div id='header'> 
        <div id='titleContainer'>
          <Title/>
        </div>
        <div id='searchContainer'>
          <Search/>
        </div>
        <div id='loginContainer'>
          <CurrentUserDataProvider>
            <LoginMenu />
          </CurrentUserDataProvider>
        </div>
      </div>
      
      {/* <div><LoginButton /></div> */}

      <div><CategoryDropdown /></div>
    </>
  )
}

export default App
