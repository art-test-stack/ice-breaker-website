import { useState } from "react";
import { durations } from "../../App";
import './DurationSelector.css'

export let duration: number = 0;

export function DurationSelector() {
    let [selectedDuration, setDurationState] = useState<number>(0);
    const setDuration = (d: number) => {
        setDurationState(d);
        duration = d;
    }
    return <>
        <div id="durationSelectorContainer">
            {
                durations.map((duration, i) => {
                    return <button className="durationSelectorButton" key={i} onClick={() => setDuration(i)} style={
                        {
                            ...(i == 0 ? {
                                borderTopLeftRadius: "10px",
                                borderBottomLeftRadius: "10px",
                            } : i == durations.length - 1 ? {
                                borderTopRightRadius: "10px",
                                borderBottomRightRadius: "10px",
                            } : {}),
                            ...(selectedDuration == i ? {
                                transform: "scale(1.1)",
                                backgroundColor: "#0f2038a3",
                            } : {})
                        }
                    }>
                        {duration}
                    </button>
                })
            }
        </div>
    </>
}