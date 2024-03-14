import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
import "./components/css/SpinTheWheel.css";
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

const frame_delta = 1 / 60;

let spinning = false;
let spinning_velocity = 0;

const colors = [
    "#81CFFF",
    "#ed27ff",
    "#FFA07A",
]

function spinWheel(speed: number) {
    spinning = true;
    spinning_velocity = speed;
}

const sketch: Sketch = p5 => {
    p5.setup = () => p5.createCanvas(p5.windowWidth - CANVAS_MARGIN, (p5.windowWidth - CANVAS_MARGIN) * 0.4);

    p5.draw = () => {
        p5.background(0);

        const diameter = p5.width * 0.4;

        // get angle of mouse position
        const mouse_angle = p5.atan2(p5.mouseY - p5.height / 2, p5.mouseX - p5.width / 2);
        if (spinning) {
            wheel_angle += spinning_velocity * frame_delta;
            spinning_velocity -= 2 * frame_delta * Math.sign(spinning_velocity);
            console.log(spinning_velocity)
            if (Math.abs(spinning_velocity) < 0.02) {
                spinning = false;
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
        
        temp_favorites_list.forEach((game, index) => {
            // create slice of rulette wheel
            p5.fill(p5.color(colors[index % colors.length]));
            p5.stroke(0);
            p5.strokeWeight(1);
            
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

        // draw center of wheel
        p5.fill(255);
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.ellipse(p5.width / 2, p5.height / 2, diameter * 0.2, diameter * 0.2);
        
    };

    // change canvas size on window resize
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth - CANVAS_MARGIN, p5.windowHeight - CANVAS_MARGIN);
    };
};

export function SpinTheWheelPage() {
    return <> 
        <div id="spinTheWheelContainer">
            <ReactP5Wrapper sketch={sketch} />
            <button id="spinButton" onClick={() => spinWheel(10)}>Spin</button>
        </div>
    </>
}

export default SpinTheWheelPage