import GoBack from "./components/tsx/GoBack.tsx";
import './components/css/CreateGamePage.css';
import './goBackWrapper.css';
import PublishButton from "./components/tsx/PublishButton.tsx";
import GameNameField, {gameName} from "./components/tsx/GameNameField.tsx";
import DescriptionPrompt, {gameDescription} from "./components/tsx/DescriptionPrompt.tsx";
import AddEquipment, {equipment} from "./components/tsx/AddEquipment.tsx";
import { AddCategoryDropdown, activeCategoriesOutput } from "./components/tsx/AddCategoryDropdown.tsx";
import PlayerNoSlider, {minPlayers, maxPlayers} from "./components/tsx/PlayerNoSlider.tsx";
import LoginMenu from './components/tsx/LoginMenu.tsx';
import { CurrentUserDataProvider, currentUserDataValue } from "./firebase/auth.tsx";
import { Title } from './components/tsx/Title.tsx';
import './components/css/CreateGamePage.css';
import './goBackWrapper.css';
import './App.css';
import { database } from './firebase/init.ts';
import { push, ref } from "@firebase/database";
import { DurationSelector, duration } from "./components/tsx/DurationSelector.tsx";

const publishButtonClicked = () => {
    const userData = currentUserDataValue;
    
    if (!userData) {
        window.alert("You must be logged in to create a game!")
    } else if (gameName == '' || gameDescription == '') {
        window.alert("All fields must be filled!")
    } else {
        push(ref(database, 'games'), {
            name: gameName,
            description: gameDescription,
            minPlayers: minPlayers,
            equipment: equipment,
            categories: activeCategoriesOutput,
            maxPlayers: maxPlayers,
            creator: userData.user?.uid,
            duration: duration,
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
        <div id='header'> 
          <div id='titleContainer'>
            <Title/>
          </div>
          <div id='searchContainer'>
          </div>
          <div id='loginContainer'>
            <CurrentUserDataProvider>
              <LoginMenu />
            </CurrentUserDataProvider>
          </div>
          {/* <div><LoginButton /></div> */}
        </div>
        <div className="createGamePageContent">
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
                <div id="createGameRightContainer" style={{minWidth: "240px"}}>

                    <div id="createGameSettingsBox">
                        <AddEquipment/>
                        <PlayerNoSlider/>
                        <DurationSelector/>
                        <AddCategoryDropdown/>
                    </div>
                        <CurrentUserDataProvider>
                            <PublishButton onClick={() => {
                                publishButtonClicked();
                            }}/>
                        </CurrentUserDataProvider>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default CreateGamePage