import GoBack from "../components/atoms/GoBack";

import './CreateGamePage.css';
import '../goBackWrapper.css';
import PublishButton from "./PublishButton/PublishButton";
import GameNameField, {gameName} from "./GameNameField/GameNameField";
import DescriptionPrompt, {gameDescription} from "./DescriptionPrompt/DescriptionPrompt";
import AddEquipment, {equipment} from "./AddEquipment/AddEquipment";
import CreateGameButton from "./CreateGameButton/CreateGameButton";
import { AddCategoryDropdown, activeCategoriesOutput } from "./AddCategory/AddCategoryDropdown";
import PlayerNoSlider, {minPlayers, maxPlayers} from "./SelectPlayerNumberSlider/PlayerNoSlider";

import { database } from '../firebase/init';
import { push, ref } from "@firebase/database";


const publishButtonClicked = () => {
    /*if (gameName == ''){
        window.alert("All fields must be filled")*/
    
    if (gameName == '' || gameDescription == '') {
        window.alert("All fields must be filled!")
    } else {
        push(ref(database, 'games'), {
            name: gameName,
            description: gameDescription,
            minPlayers: minPlayers,
            equipment: equipment,
            categories: activeCategoriesOutput,
            maxPlayers: maxPlayers,
        }).then(() => {
            window.alert("The game " + gameName + " was added successfully!")
            window.location.reload() 
        }).catch((error) => {
            window.alert("Error adding game: " + error.message)
        })
    }
}


export function CreateGamePage() {
    return (
    <div>
        <div className="goBackWrapper">
            <GoBack onClick={() => {
                console.log('go back button clicked');
            }}/>
            <div id="createGameBox">
                <div id="createGameInputBox">
                    <GameNameField/>
                    <DescriptionPrompt/>
                </div>
                <div id="createGameRightContainer">

                    <div id="createGameSettingsBox">
                        <AddEquipment/>
                        <PlayerNoSlider/>
                        <AddCategoryDropdown/>
                    </div>

                    <CreateGameButton onClick={() => {
                        console.log('create game button clicked');
                    }}/>
                        <PublishButton onClick={publishButtonClicked}/>

                </div>
            </div>
        </div>
    </div>
  );
}