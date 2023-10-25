import React, { useState } from 'react';

const SearchBar = ({ onSearch, onFileUpload }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  // const handleFileChange = (event) => {
  //   onFileUpload(event);
  //   console.log("chegou aq")
  // };

  return (
    <div>
        <div className="">
            <div class="container-fluid" style={{ display: 'flex', justifyContent: "center" }}>
                <input class="form-control me-2" type="search" placeholder="Search"style={{ width: '400px' }}  aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button class="btn btn-outline-success"onClick={handleSearch} >Search</button>
                
            </div>
        </div>  
    </div>
  );
};


export default SearchBar;
