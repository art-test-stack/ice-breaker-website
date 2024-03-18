// import { get, ref } from '@firebase/database';
// import { database } from '../../firebase/init';
import '../css/AliasInfo.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField'; 
import * as React from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { push, ref } from 'firebase/database';
import { database } from '../../firebase/init';
import { useLocation } from 'react-router-dom';



interface AliasInfoProps {
    aliases: string[];
}

interface AliasFormData {
    alias: string; 
    gameID: string; 
}


function AliasInfo({aliases}: AliasInfoProps){
    const currentLocation = useLocation();

    const listAliases = Object.values(aliases).map((aliases, i) => 
        <li key={i}>
            {aliases}
        </li>
        );

    const [userAddedAlias, setUserAddedAlias] = React.useState(''); 
    const gameID = currentLocation.pathname.split("/")[2]

    const submitAlias = () => {
        push(ref(database, 'games/' + gameID +'/aliases'), userAddedAlias).then((response) => {
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