import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
import "./components/css/SpinTheWheel.css";
import { Title } from "./components/tsx/Title";
import { CurrentUserDataProvider, currentUserData } from "./firebase/auth";
import LoginMenu from "./components/tsx/LoginMenu";
import GoBack from "./components/tsx/GoBack";
import { useContext, useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "./firebase/init";
import GameCard from "./components/tsx/GameCard";
import { darkTheme, getCategoryList } from "./App.tsx";
import { useNavigate } from "react-router-dom";
import { getGameCardImg } from "./components/tsx/GameGrid";
import { ThemeProvider } from '@mui/material/styles';

const CANVAS_MARGIN: number = 100;

let favorites_list: any[] = [];

let wheel_angle = 0;
let holding = false;
let base_angle = 0;
let base_mouse = 0;
let mouse_angle_history: number[] = [];

const frame_delta = 1 / 60;

let spinning_velocity = 0;

const colors = [
    "#81CFFF",
    "#ed27ff",
    "#FFA07A",
]

let wheel_spinning = false;
let set_wheel_spinning: any = null;
let set_winner: any = null;

const sketch: Sketch = p5 => {

    p5.updateWithProps = (props: any) => {
        wheel_spinning = props.spinning;
        set_wheel_spinning = props.set_wheel_spinning;
        favorites_list = props.favorites;
        set_winner = props.set_winner;
    };

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth - CANVAS_MARGIN, (p5.windowWidth - CANVAS_MARGIN) * 0.4 + 20);
        // set font to bold
        p5.textFont("Calibri, sans-serif");
        p5.textStyle(p5.BOLD);
        p5.textWrap(p5.WORD);
    
    }

    p5.draw = () => {
        p5.background(0);

        const diameter = p5.width * 0.4;

        // get angle of mouse position
        const mouse_angle = p5.atan2(p5.mouseY - p5.height / 2, p5.mouseX - p5.width / 2);
        if (wheel_spinning) {
            wheel_angle += Math.max(spinning_velocity, 0.05) * frame_delta;
            spinning_velocity -= frame_delta * Math.sign(spinning_velocity) * 2;
            if (Math.abs(spinning_velocity) < 0.02) {
                set_wheel_spinning(false);

                // find winner based on wheel angle
                let winner_index = 0
                for (let i = 0; i < favorites_list.length; i++) {
                    if (is_selected(i)) {
                        winner_index = i;
                        break;
                    }
                }
                set_winner(favorites_list[winner_index]);
                spinning_velocity = 0;
            }
        } else if (p5.mouseIsPressed) {
            if (!holding) {
                holding = true;
                base_angle = wheel_angle;
                base_mouse = mouse_angle;
            } else {
                wheel_angle = base_angle + (mouse_angle - base_mouse);
                mouse_angle_history.push(mouse_angle);
            }
        } else {
            // if mouse is released, check if it was a spin
            if (holding) {
                const speed = 
                    (mouse_angle_history[mouse_angle_history.length - 1] - mouse_angle_history[Math.max(mouse_angle_history.length - 15, 0)]) 
                            / Math.min(mouse_angle_history.length, 15) 
                            / frame_delta;


                if (Math.abs(speed) > p5.PI && Math.abs(speed) < p5.PI * 10) {
                    // start spinning
                    set_wheel_spinning(true);
                    spinning_velocity = Math.min(Math.abs(speed), 15);
                    
                }
            }
            holding = false;
            mouse_angle_history = [];
        }

        function normalize_angle(angle: number) {
            const twoPi = 2 * Math.PI;
            return ((angle % twoPi) + twoPi) % twoPi;
        }

        function is_selected(gameindex: number) {
            let a = (p5.TWO_PI / favorites_list.length * gameindex + wheel_angle)
            let b = (p5.TWO_PI / favorites_list.length * (gameindex + 1) + wheel_angle)

            // normalize angles 0 to 2PI
            a = normalize_angle(a);
            b = normalize_angle(b);
            
            return a < p5.PI * 1.5 && b > p5.PI * 1.5;
        }
        
        favorites_list.forEach((game, index) => {
            // create slice of rulette wheel
            if (is_selected(index)) {
                p5.fill(255, 255, 0);
            } else {
                p5.fill(p5.color(colors[index % colors.length]));
            }
            p5.stroke(0);
            p5.strokeWeight(3);
            
            p5.arc(p5.width / 2, p5.height / 2, diameter, diameter, p5.TWO_PI / favorites_list.length * index + wheel_angle, p5.TWO_PI / favorites_list.length * (index + 1) + wheel_angle, p5.PIE);
            // add text to slice
            p5.fill(0);
            p5.noStroke();
            p5.textSize(diameter * 0.05);
            p5.textAlign(p5.LEFT, p5.CENTER);
            p5.push();
            p5.translate(p5.width / 2, p5.height / 2);
            p5.rotate(p5.TWO_PI / favorites_list.length * index + p5.TWO_PI / favorites_list.length / 2 + wheel_angle);
            // make text fit within slice
            const text_width = p5.textWidth(game.name);
            //if (text_width > diameter * 0.25) {
                p5.textSize(diameter * 0.05 * diameter * 0.25 / text_width);
            //} 
            p5.text(game.name, diameter * 0.2, 0);
            p5.pop();
        });
        
        p5.noFill();
        p5.stroke(100);
        p5.strokeWeight(2);
        p5.ellipse(p5.width / 2, p5.height / 2, diameter + 10, diameter + 10)

        // draw center of wheel
        p5.fill(0, 50)
        p5.noStroke();
        p5.ellipse(p5.width / 2, p5.height / 2 + 2, diameter * 0.33, diameter * 0.33);
        p5.fill(255);
        p5.stroke(0);
        p5.strokeWeight(3);
        p5.ellipse(p5.width / 2, p5.height / 2, diameter * 0.3, diameter * 0.3);

        // draw arrow on top of wheel
        p5.fill(255);
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.triangle(
            p5.width / 2 - 10, p5.height / 2 - diameter * 0.5 - 10,
            p5.width / 2, p5.height / 2 - diameter * 0.5 + 10, 
            p5.width / 2 + 10, p5.height / 2 - diameter * 0.5 - 10);
    };

    // change canvas size on window resize
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth - CANVAS_MARGIN, (p5.windowWidth - CANVAS_MARGIN) * 0.4 + 20);
    };
};




export function SpinTheWheelPage() {
    const navigate = useNavigate();
    let [spinning, setSpinning] = useState(false);
    let [favorites, setFavorites] = useState<any[]>([]);
    let [winner, setWinner] = useState<any>(null);

    function spinWheel(speed: number) {
        setSpinning(true)
        spinning_velocity = speed;
    }

    let userData = useContext(currentUserData);

    useEffect(() => {
        // get list of favorite games
        let favorites_ids = (userData?.data as any)?.favorites;

        // get game data from favorites
        if (favorites_ids) {
            let favorites_ids_list: string[] = Object.keys(favorites_ids)
            const promises = favorites_ids_list.map((id) => {
                return get(ref(database, `games/${id}`))
            });

            Promise.all(promises).then((values) => {
                const fav = Object.values(values.map((value) => value.val())).map((value, index) => {
                    let game: any = value;
                    game.id = favorites_ids_list[index];
                    return game;
                });
                setFavorites(fav);

                //setWinner(fav[0]);
            });
        }
    }, [userData]);

    if (!userData?.data || favorites.length < 2) {
        return <>
            <div>
                <div id='header'> 
                    <div id='titleContainer'>
                        <Title/>
                    </div>
                    <div id='searchContainer'></div>
                    <div id='loginContainer'>
                        <CurrentUserDataProvider>
                        <LoginMenu />
                        </CurrentUserDataProvider>
                    </div>
                </div>
            </div>
            
            <div className="goBackWrapper">
                <div style={{margin: "10px"}}>
                    <GoBack onClick={() => {
                        console.log('go back button clicked');
                    }}/>
                </div>
                <div id="spinTheWheelContainer">
                    <i> You need to be logged in and have at least 2 favorite games to spin the wheel. </i>
                </div>
            </div>
        </>
    } else {
        return <>
            <ThemeProvider theme={darkTheme}>
            <div>
                <div id='header'> 
                    <div id='titleContainer'>
                        <Title/>
                    </div>
                    <div id='searchContainer'></div>
                    <div id='loginContainer'>
                        <CurrentUserDataProvider>
                        <LoginMenu />
                        </CurrentUserDataProvider>
                    </div>
                    
                </div>
            </div>
            </ThemeProvider>
            
            <div className="goBackWrapper">
                <div style={{margin: "10px"}}>
                    <GoBack onClick={() => {
                        console.log('go back button clicked');
                    }}/>
                </div>
                <div id="spinTheWheelSplit">
                    <div id="spinTheWheelContainer">
                        <div style={{zIndex: "-10000"}}>
                            <ReactP5Wrapper sketch={sketch} spinning={spinning} set_wheel_spinning={setSpinning} favorites={favorites} set_winner={setWinner}/>
                        </div>
                        <button id={spinning ? "disabledSpinButton" : "spinButton"} onClick={() => spinWheel(8 * Math.random() * 2)}>Spin</button>
                    </div>
                    <div id="winnerContainer" style={{transform: `scale(${spinning ? 0.6 : 1}) rotate(${spinning ? "10deg":0})`, opacity: spinning ? 0 : 1}}>
                        <h1>Winner:</h1>
                        { winner ? 
                        <GameCard
                            imgSrc={getGameCardImg(winner)} // this is not currently from the database
                            imgAlt={'Image 2'}
                            title={winner.name}
                            category={getCategoryList(winner.categories).join(', ')}
                            onClick={() => {
                                console.log(winner.id)
                                navigate(`/games/${winner.id}`)
                            }} 
                            gameId={winner.id}
                            style={{width: "100%"}}
                        /> : <div> Spin the wheel to choose a game! </div> }
                        
                    </div>
                </div>
            </div>
        </>
    }
}

export default SpinTheWheelPage