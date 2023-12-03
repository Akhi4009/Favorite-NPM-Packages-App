import React, { useState,useEffect } from 'react';
import Input from '../../custom/Input';
import useDebounce from "../../custom/Debounce"; 
import useApi from '../../custom/Api';  // Adjust the path based on your project structure
import { SearchApiResponse, SearchResultItem } from '../../constant';

interface SearchBarProps {
  onSearch: (results: SearchResultItem[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 1000);

  const apiUrl = `https://api.npms.io/v2/search?q=${debouncedQuery}`;

  
    const { data, loading, error } = useApi<SearchApiResponse>(apiUrl);
  

  useEffect(() => {
    if (data) {
      const results: SearchResultItem[] = data.results;
      onSearch(results);
    }
  }, [data, onSearch]);

  const handleInputChange = (newValue: string) => {
    setQuery(newValue);
  };

  return (
    <div className='w-full'>
      <Input label="Search for NPM Packages" value={query} onChange={handleInputChange}  />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default SearchBar;