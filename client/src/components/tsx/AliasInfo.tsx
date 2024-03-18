// import { get, ref } from '@firebase/database';
// import { database } from '../../firebase/init';
import '../css/AliasInfo.css';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'; 
import * as React from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { onValue, push, ref } from 'firebase/database';
import { database } from '../../firebase/init';
import { useLocation } from 'react-router-dom';




/* <GameInfo numPlayers="string" duration = "string" categories="string" equipments={[string,string]} /> */





function AliasInfo({gameId}: {gameId: string}){
    const currentLocation = useLocation();

    let [aliases, setAliases] = useState<string[]>([]);

    // get aliases from database
    useEffect(() => {
        onValue(ref(database, 'games/' + gameId + '/aliases'), (snapshot) => {
            if (snapshot.exists()) {
                setAliases(snapshot.val());
            }
        });
    }, [gameId]);

    const listAliases = Object.values(aliases).map((aliases, i) => 
        <li key={i}>
            {aliases}
        </li>
        );

    const [userAddedAlias, setUserAddedAlias] = React.useState(''); 

    // let [userName, setUserName] = useState<string | null>(null);

    // get author username from database
    // get(ref(database, 'userData/' + author + "/username")).then((snapshot: any) => {
    //     if (snapshot.exists()) {
    //         setUserName(snapshot.val());
    //     }
    // }).catch((error: any) => {
    //     console.error(error);
    // });

    const gameID = currentLocation.pathname.split("/")[2]

    const submitAlias = () => {
        // console.log(formData)
        // Push reviews to database
        push(ref(database, 'games/' + gameID +'/aliases'), userAddedAlias).then((response) => {
            // reviewId from database
            // const reviewID = response.key   
            setUserAddedAlias('') 
            console.log(response)
        }).catch((error) => {
            console.log('Error: ', error)
            window.alert("Error adding review: " + error.message)
        })
    }

    return (
    <>
    <div id='aliasBox'>
        <div id="aliasList">
            <p className='bolded'>Aliases (also known as):</p>
            <ul className='aliases'>{listAliases}</ul>
        </div>
        <div id="addAliasTextField">
        <TextField
                id="add-alias-textfield"
                label="Add alias"
                variant="standard"
                size="small"
                // type="password"
                value={userAddedAlias}
                onChange={(e) => setUserAddedAlias(e.target.value)}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" color="primary" onClick={submitAlias}>
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
        />
        </div>
    </div>
    </>)
}

export default AliasInfo;