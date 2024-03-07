// import { get, ref } from '@firebase/database';
// import { database } from '../../firebase/init';
import '../css/AliasInfo.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField'; 
import * as React from 'react';



interface AliasInfoProps {
    aliases: string[];
}

/* <GameInfo numPlayers="string" duration = "string" categories="string" equipments={[string,string]} /> */

function AliasInfo({aliases}: AliasInfoProps){

    const listAliases = aliases.map((aliases, i) => 
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

    return (
    <>
    <div id='aliasBox'>
        <div id="aliasList">
            <p className='bolded'>Aliases (also known as):</p>
            <ul className='listEquipments'>{listAliases}</ul>
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
        />
        </div>
    </div>
    </>)
}

export default AliasInfo;