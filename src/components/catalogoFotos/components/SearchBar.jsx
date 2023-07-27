import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid" style={{ display: 'flex' }}>
                <input class="form-control me-2" type="search" placeholder="Search" style={{ marginRight: '10px' }} aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button class="btn btn-outline-success"onClick={handleSearch}>Search</button>
            </div>
        </nav>  
    </div>
  );
};


export default SearchBar;
