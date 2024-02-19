import './GameNameField.css'
import { ChangeEvent } from 'react'

export let gameName = ""

function handleChange(e: ChangeEvent<HTMLInputElement>){
    gameName = e.target.value
}


export default function GameNameField() {
  return (
    <div style={{width:"100%"}}>
        <form>
            <input id="namePrompt" type='text' onChange={handleChange}  placeholder='What is the name of the game?' />
        </form>
    </div>
  );
}