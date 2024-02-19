import './Search.css';

export function Search(){
    return (
        <> 
        <form id="formSearch" style={SearchStyle}>
            <input id="searchbar" type="search" placeholder='Search'/>
        </form>
        </>
    );
}

const color = {
    pink: '#826B7A',
    font: '#B4A6AF'
};

const SearchStyle = {
    background: color.pink,
    borderStyle: 'none',
    borderRadius: '50px',
    width: '367px',
    padding: '0',
    margin: '8px 0',
    lineHeight: '1.5',
};