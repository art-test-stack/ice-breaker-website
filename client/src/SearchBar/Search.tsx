import { createContext, useContext, useState } from 'react';
import './Search.css';


interface SearchContextType {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  }
  
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

export function Search(){
    const { searchQuery, setSearchQuery }: any = useSearch();
    
    const handleSearchInputChange = (event: any) => {
        setSearchQuery(event.target.value);
    };
  
    return (
        <> 
        <head>
            <link href='https://fonts.googleapis.com/css?family=Galindo' rel='stylesheet'></link>
        </head>
        <form id="formSearch" style={SearchStyle}>
            <input 
                id="searchbar" 
                type="search" 
                placeholder='Search'
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
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