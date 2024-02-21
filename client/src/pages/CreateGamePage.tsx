import GoBack from "../components/atoms/GoBack";
import '../CreateGamePage/CreateGamePage.css';
import '../goBackWrapper.css';
import PublishButton from "../CreateGamePage/PublishButton/PublishButton";
import GameNameField, {gameName} from "../CreateGamePage/GameNameField/GameNameField";
import DescriptionPrompt, {gameDescription} from "../CreateGamePage/DescriptionPrompt/DescriptionPrompt";
import AddEquipment, {equipment} from "../CreateGamePage/AddEquipment/AddEquipment";
import { AddCategoryDropdown, activeCategoriesOutput } from "../CreateGamePage/AddCategory/AddCategoryDropdown";
import PlayerNoSlider, {minPlayers, maxPlayers} from "../CreateGamePage/SelectPlayerNumberSlider/PlayerNoSlider";
import LoginMenu from '../LoginRegisterMenu/LoginMenu.tsx';
import { CurrentUserDataProvider, currentUserDataValue } from "../firebase/auth";
import { Title } from '../Title/Title.tsx';
import '../CreateGamePage/CreateGamePage.css';
import '../goBackWrapper.css';
import '../App.css';
import { database } from '../firebase/init';
import { push, ref } from "@firebase/database";
import { DurationSelector, duration } from "../CreateGamePage/DurationSelector/DurationSelector.tsx";

const publishButtonClicked = () => {
    // get current context value
    const userData = currentUserDataValue;
    /*if (gameName == ''){
        window.alert("All fields must be filled")*/
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