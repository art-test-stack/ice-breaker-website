
import GoBack from "../components/atoms/GoBack";


import './CreateGamePage.css';
import '../goBackWrapper.css';
import GameNameField from "./GameNameField/GameNameField";
import DescriptionPrompt from "./DescriptionPrompt/DescriptionPrompt";
import AddEquipment from "./AddEquipment/AddEquipment";
import CreateGameButton from "./CreateGameButton/CreateGameButton";
import { AddCategoryDropdown } from "./AddCategory/AddCategoryDropdown";

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
                        <AddCategoryDropdown/>
                    </div>
                    <CreateGameButton onClick={() => {
                        console.log('create game button clicked');
                    }}/>
                </div>
            </div>
        </div>
    </div>
  );
}