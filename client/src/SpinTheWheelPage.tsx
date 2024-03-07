import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
const CANVAS_MARGIN: number = 100;
const sketch: Sketch = p5 => {
    p5.setup = () => p5.createCanvas(p5.windowWidth - CANVAS_MARGIN, p5.windowHeight - CANVAS_MARGIN);

    p5.draw = () => {
        p5.background(100);
        p5.ellipse(p5.width / 2, p5.height / 2, 100, 100)
    };

    // change canvas size on window resize
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth - CANVAS_MARGIN, p5.windowHeight - CANVAS_MARGIN);
    };
};

export function SpinTheWheelPage() {
    return <> 
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh"}}>
            <ReactP5Wrapper sketch={sketch} />
        </div>
    </>
}

export default SpinTheWheelPage