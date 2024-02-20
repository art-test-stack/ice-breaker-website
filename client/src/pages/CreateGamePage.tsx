import GoBack from "../components/atoms/GoBack";
import PublishButton from "../CreateGamePage/PublishButton/PublishButton.tsx";
import GameNameField from "../CreateGamePage/GameNameField/GameNameField";
import DescriptionPrompt from "../CreateGamePage/DescriptionPrompt/DescriptionPrompt";
import AddEquipment from "../CreateGamePage/AddEquipment/AddEquipment";
import LoginMenu from '../LoginRegisterMenu/LoginMenu.tsx';
import { AuthUI, CurrentUserDataProvider } from "../firebase/auth";
import { Title } from '../Title/Title.tsx';
import '../CreateGamePage/CreateGamePage.css';
import '../goBackWrapper.css';
import '../App.css';

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
                      </div>
                      <PublishButton onClick={function (): void {
                            throw new Error("Function not implemented.");
                        } }></PublishButton>
                  </div>
              </div>
          </div>
        </div>
    </div>
  );
}

export default CreateGamePage