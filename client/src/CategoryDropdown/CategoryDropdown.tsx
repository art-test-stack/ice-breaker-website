import './CategoryDropdown.css'
import { useState } from 'react';


export function CategoryDropdown() {
    let [showDropdown, setShowDropdown] = useState(false);
    // categories of ice breaker games
    const categories = [
        "Chill",
        "Active",
        "Team Building",
        "Card Game",
        "Outdoor",
        "Indoor",
    ]
    
    return (
        <>
            <button id="categoriesButton" onClick={() => setShowDropdown(!showDropdown)}>
                <img src='src/assets/dropdownIcon.svg' style={{marginRight: "10px"}}/>
                Categories
            </button>
            <div id="categoriesDropdown" style={{transform: showDropdown ? "" : "scaleY(0)", backgroundColor: showDropdown ? "#354b5ab1" : '#62effca5'}}>
                {
                    categories.map((category, i) => {
                        return <button className={(i % 2==0 ? "categoryOptionEven" : "categoryOptionOdd")+" categoryOption"}  key={i} style={{
                            opacity: showDropdown ? 1 : 0,
                            color: showDropdown ? "white" : i % 2==0 ? '#ed27ff' : '#FFA07A',
                            transform: showDropdown ? "" : `translate(${i % 2==0 ? "10px" : "-10px"}, -20px)`,
                            transitionDelay: showDropdown? `${0.1 + i * 0.05}s`: "0s",
                        }}>{category}</button>
                    })
                }
            </div>
        </>
    )
    
}




