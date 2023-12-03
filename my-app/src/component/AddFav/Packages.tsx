import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchResultItem } from '../../constant';
import TextArea from '../../custom/TextArea';
import Button from '../../custom/Button';

interface PackageListProps {
  searchResults: SearchResultItem[];
}
interface DataItem {
    selectedPackage: string|null;
    textValue: string|null;
  }
  
const ScrollableWrapper = styled.div`
  max-height: 200px; /* Set your desired maximum height */
  overflow-y: auto;
  border: 1px solid #ccc;
 padding:10px;
 margin-bottom:10px;
`;


const PackageList: React.FC<PackageListProps> = ({ searchResults }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [textValue, setTextValue] = useState('');

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
  };


 const handleData=()=>{
    if(selectedPackage===null){
        alert("Please select  a package")
        return
    }
    const newObj:DataItem={
        selectedPackage,
        textValue
    }
    const storedDataString = localStorage.getItem("data");

if (storedDataString !== null) {
  const storedData: DataItem[] = JSON.parse(storedDataString);
  let res=storedData.filter(ele=>ele.selectedPackage===selectedPackage)
  if(res.length>0){
    alert("This package is already present in fav")
    return
  }
  storedData.push(newObj);
// Save the updated array back to local storage
  localStorage.setItem("data", JSON.stringify(storedData));
  alert("Package added in fav")
 } else {
    const storedData=[]
    storedData.push(newObj);
    localStorage.setItem("data", JSON.stringify(storedData));
    alert("Package added in fav")
}
}

  return (
    <div className="w-1/2 m-auto">
      <h2 className="mt-5 mb-5" >Results</h2>
      {
        searchResults &&
      <ScrollableWrapper>
        <ul>
          {searchResults &&
            searchResults.map((result, index) => (
              <li key={index} className="mb-2">
                <label >
                  <input
                  className="mr-2"
                    type="radio"
                    name="packageSelection"
                    value={result.package.name}
                    checked={selectedPackage === result.package.name}
                    onChange={() => handleSelectPackage(result.package.name)}
                  />
                  {result.package.name}
                </label>
              </li>
            ))}
        </ul>
      </ScrollableWrapper>
}
      
      <TextArea
        label="Why is this i your fav?"
        rows={4}
        cols={50}
        placeholder="Type something..."
        value={textValue}
        onChange={handleTextAreaChange}
      />
      <Button onClick={handleData} className="w-28 bg-blue rounded-md p-1 m-1">Submit</Button>
    </div>
  );
};

export default PackageList;


