import './CategoryDropdown.css'
import { useState } from 'react';

import  {categories} from '../App.tsx'

export function CategoryDropdown() {
    let [showDropdown, setShowDropdown] = useState(false);

    let [activeCategories, setActiveCategories] = useState(categories.map(() => false));
    // categories of ice breaker games
    
    return (
        <>
            <button id="categoriesButton" onClick={() => setShowDropdown(!showDropdown)}>
                <img src='src/assets/dropdownIcon.svg' style={{marginRight: "10px"}}/>
                Categories
            </button>
            {
                categories.map((category, i) => {
                    if (activeCategories[i]) {
                        const accentColor = getAccent(i);
                        return <span key={i} className="categoryLabel" style={{backgroundColor: accentColor + "bb", border: "2px solid " + accentColor}}>{category}</span>
                    }
                })
            }
            <div id="categoriesDropdown" style={{transform: showDropdown ? "" : "scaleY(0)", backgroundColor: showDropdown ? "#354b5ab1" : '#62effca5'}}>
                {
                    
                    categories.map((category, i) => {
                        const accentColor = getAccent(i);
                        return <button className={(i % 2==0 ? "categoryOptionEven" : "categoryOptionOdd")+" categoryOption"}  key={i} style={{
                            opacity: showDropdown ? 1 : 0,
                            color: showDropdown ? "white" : accentColor,
                            transform: showDropdown ? "" : `translate(${i % 2==0 ? "10px" : "-10px"}, -20px)`,
                            transitionDelay: showDropdown? `${0.1 + i * 0.05}s`: "0s",
                            border: activeCategories[i] ? "2px solid " + accentColor : "2px solid transparent",
                            backgroundColor: activeCategories[i] ? accentColor + "bb" : "",
                        }} onClick={() => {
                            let newActiveCategories = [...activeCategories];
                            newActiveCategories[i] = !newActiveCategories[i];
                            setActiveCategories(newActiveCategories);
                        }}>{category}</button>
                    })
                }
            </div>
        </>
    )
    

    function getAccent(i: number) {
        return i % 2 == 0 ? '#ed27ff' : '#FFA07A';
    }
}




