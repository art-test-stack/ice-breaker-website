import GoBack from "../components/atoms/GoBack";
import '../CreateGamePage/CreateGamePage.css';
import '../goBackWrapper.css';
import PublishButton from "../CreateGamePage/PublishButton/PublishButton";
import GameNameField, {gameName} from "../CreateGamePage/GameNameField/GameNameField";
import DescriptionPrompt, {gameDescription} from "../CreateGamePage/DescriptionPrompt/DescriptionPrompt";
import AddEquipment, {equipment} from "../CreateGamePage/AddEquipment/AddEquipment";
import CreateGameButton from "../CreateGamePage/CreateGameButton/CreateGameButton";
import { AddCategoryDropdown, activeCategoriesOutput } from "../CreateGamePage/AddCategory/AddCategoryDropdown";
import PlayerNoSlider, {minPlayers, maxPlayers} from "../CreateGamePage/SelectPlayerNumberSlider/PlayerNoSlider";
import LoginMenu from '../LoginRegisterMenu/LoginMenu.tsx';
import { AuthUI, CurrentUserDataProvider } from "../firebase/auth";
import { Title } from '../Title/Title.tsx';
import '../CreateGamePage/CreateGamePage.css';
import '../goBackWrapper.css';
import '../App.css';
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
                <div id="createGameRightContainer">

                    <div id="createGameSettingsBox">
                        <AddEquipment/>
                        <PlayerNoSlider/>
                        <AddCategoryDropdown/>
                    </div>
                        <PublishButton onClick={publishButtonClicked}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default CreateGamePage