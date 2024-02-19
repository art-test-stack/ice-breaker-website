import './GameNameField.css'
import { ChangeEvent } from 'react'


function handleChange(e: ChangeEvent<HTMLInputElement>){
    console.log(e.target.value)
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