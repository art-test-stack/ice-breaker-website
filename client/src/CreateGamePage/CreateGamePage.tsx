
import GoBack from "../components/atoms/GoBack";

import './CreateGamePage.css';
import '../goBackWrapper.css';
import PublishButton from "../components/PublishButton";
import GameNameField, {gameName} from "./GameNameField/GameNameField";
import DescriptionPrompt, {gameDescription} from "./DescriptionPrompt/DescriptionPrompt";
import AddEquipment, {equipment} from "./AddEquipment/AddEquipment";
import CreateGameButton from "./CreateGameButton/CreateGameButton";
import { AddCategoryDropdown, activeCategoriesOutput } from "./AddCategory/AddCategoryDropdown";
import PlayerNoSlider, {minPlayers, maxPlayers} from "./SelectPlayerNumberSlider/PlayerNoSlider";

import { database } from '../firebase/init';
import { push, ref } from "@firebase/database";

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
                        {/* <PlayerNoSlider/> */}
                        <AddCategoryDropdown/>
                    </div>

                    <CreateGameButton onClick={() => {
                        console.log('create game button clicked');
                    }}/>

                    <PublishButton onClick={() => {
                        /*push(ref(database, 'games'), {
                            name: gameName,
                            description: gameDescription,
                            equipment: equipment,
                            minPlayers: minPlayers,
                            maxPlayers: maxPlayers,
                            categories: activeCategoriesOutput
                            
                        })*/
                    }}/>
                </div>
            </div>
        </div>
    </div>
  );
}