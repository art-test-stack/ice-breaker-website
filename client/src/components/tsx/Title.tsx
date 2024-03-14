import { Link } from 'react-router-dom';
import '../css/Title.css'

export function Title() {
    const letters = Array.from("ICE-BREAKER"); // Your title

    return (
        <>
        <head>
            <link href='https://fonts.googleapis.com/css?family=Erica One' rel='stylesheet'/>
        </head>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <div id='title'>
                {
                    letters.map((letter, i) => (
                        <div className='titleLetter' data-cy="title" data-letter={letter} style={
                            {
                                zIndex: letters.length - i,
                            }
                        } key={i
                        }>{letter}</div>
                    ))
                }
            </div>
        </Link>
        </>
    );
}