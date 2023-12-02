import {useState,useEffect} from "react"
import SearchBar from "./SearchBar"
import {  SearchResultItem } from "../../constant";




const AddFavorite:React.FC = () => {

    const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  const handleSearch = (results: SearchResultItem[]) => {
    // Handle the search results, e.g., update state
    setSearchResults(results);
  };
  

  return (
    <div className="w-full">
    <SearchBar onSearch={handleSearch} />
    </div>
  )
}

export default AddFavorite