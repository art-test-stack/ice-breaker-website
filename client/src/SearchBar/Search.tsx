import { createContext, useContext, useState } from 'react';
import './Search.css';


interface gamesQuery {
  searchQuery: string;
  categories: string[] | any;
}
interface SearchContextType {
    filters: gamesQuery;
    setFilters: React.Dispatch<React.SetStateAction<gamesQuery>>;
  }
  
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: any) => {
  const initialFilters = {searchQuery: '', categories: []}
  const [filters, setFilters] = useState(initialFilters);
  
  return (
    <SearchContext.Provider value={{ filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

export function Search(){
    const { filters, setFilters }: any = useSearch();
    
    const handleSearchInputChange = (event: any) => {
      setFilters( {...filters, searchQuery: event.target.value});
    };
    return (
        <> 
        <form id="formSearch" style={SearchStyle}>
            <input 
                id="searchbar" 
                type="search" 
                placeholder='Search'
                value={filters.searchQuery}
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