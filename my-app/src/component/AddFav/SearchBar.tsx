import React, { useState, useEffect } from 'react';
import Input from '../../custom/Input';
import useDebounce from "../../custom/Debounce"; 
import { SearchApiResponse,SearchResultItem } from '../../constant';


interface SearchBarProps {
  onSearch: (results: SearchResultItem[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 500); // Adjust the delay as needed

  useEffect(() => {
    // Perform the search when debouncedQuery changes
    const search = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await fetch(`https://api.npms.io/v2/search?q=${debouncedQuery}`);
        const data: SearchApiResponse = await response.json();

        // Extracting the results array from the API response
        const results: SearchResultItem[] = data.results;

        onSearch(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    search();
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (newValue: string) => {
    setQuery(newValue);
  };

  return (
    <div className='w-full'>
      <Input label="Search for NPM Packges" value={query} onChange={handleInputChange}  />
    </div>
  );
};

export default SearchBar;

