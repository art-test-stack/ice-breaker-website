import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
import "./components/css/SpinTheWheel.css";
import { Title } from "./components/tsx/Title";
import { CurrentUserDataProvider } from "./firebase/auth";
import LoginMenu from "./components/tsx/LoginMenu";
import GoBack from "./components/tsx/GoBack";

const CANVAS_MARGIN: number = 100;

const temp_favorites_list = [
    "game1",
    "game2",
    "game3",
    "game4",
    "game5",
    "game6",
]

let wheel_angle = 0;
let holding = false;
let base_angle = 0;
let base_mouse = 0;
let mouse_angle_history: number[] = [];
let spinning = false;

const frame_delta = 1 / 60;

let spinning_velocity = 0;

const colors = [
    "#81CFFF",
    "#ed27ff",
    "#FFA07A",
]

const sketch: Sketch = p5 => {
    p5.setup = () => p5.createCanvas(p5.windowWidth - CANVAS_MARGIN, (p5.windowWidth - CANVAS_MARGIN) * 0.4 + 20);

    p5.draw = () => {
        p5.background(0);

        const diameter = p5.width * 0.4;

        // get angle of mouse position
        const mouse_angle = p5.atan2(p5.mouseY - p5.height / 2, p5.mouseX - p5.width / 2);
        if (spinning) {
            wheel_angle += Math.max(spinning_velocity, 0.05) * frame_delta;
            spinning_velocity -= frame_delta * Math.sign(spinning_velocity) * 2;
            if (Math.abs(spinning_velocity) < 0.02) {
                spinning = (false);
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
                console.log(speed);
                if (Math.abs(speed) > p5.PI && Math.abs(speed) < p5.PI * 10) {
                    // start spinning
                    spinWheel(speed);
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
            let a = (p5.TWO_PI / temp_favorites_list.length * gameindex + wheel_angle)
            let b = (p5.TWO_PI / temp_favorites_list.length * (gameindex + 1) + wheel_angle)

            // normalize angles 0 to 2PI
            a = normalize_angle(a);
            b = normalize_angle(b);
            
            return a < p5.PI * 1.5 && b > p5.PI * 1.5;
        }
        
        temp_favorites_list.forEach((game, index) => {
            // create slice of rulette wheel
            if (is_selected(index)) {
                p5.fill(255, 255, 0);
            } else {
                p5.fill(p5.color(colors[index % colors.length]));
            }
            p5.stroke(0);
            p5.strokeWeight(3);
            
            p5.arc(p5.width / 2, p5.height / 2, diameter, diameter, p5.TWO_PI / temp_favorites_list.length * index + wheel_angle, p5.TWO_PI / temp_favorites_list.length * (index + 1) + wheel_angle, p5.PIE);
            // add text to slice
            p5.fill(0);
            p5.noStroke();
            p5.textSize(diameter * 0.05);
            p5.textAlign(p5.LEFT, p5.CENTER);
            p5.push();
            p5.translate(p5.width / 2, p5.height / 2);
            p5.rotate(p5.TWO_PI / temp_favorites_list.length * index + p5.TWO_PI / temp_favorites_list.length / 2 + wheel_angle);
            p5.text(game, diameter * 0.3, 0);
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

function spinWheel(speed: number) {
    spinning = (true);
    spinning_velocity = speed;
}


export function SpinTheWheelPage() {

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
                <div style={{zIndex: "-10000"}}>
                    <ReactP5Wrapper sketch={sketch} style={{padding: "20px"}} />
                </div>
                <button id={"spinButton"} onClick={() => spinWheel(8 * Math.random() * 2)}>Spin</button>
            </div>
        </div>
    </>
}

export default SpinTheWheelPage