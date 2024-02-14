import './Title.css'

export function Title() {
    const letters = Array.from("ICE-BREAKER"); // Your title

    return (
        <>
        <head>
            <link href='https://fonts.googleapis.com/css?family=Erica One' rel='stylesheet'/>
        </head>
        <div id='title'>
            {
                letters.map((letter, i) => (
                    // set z layer to be 1 - i
                    <div className='titleLetter' data-letter={letter} style={
                        {
                            zIndex: letters.length - i,
                        }
                    } key={i
                    }>{letter}</div>
                ))
            }
        </div>
        </>
    );
}