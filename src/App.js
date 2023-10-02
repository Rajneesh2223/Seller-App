import React, { useState } from 'react';
import Navbar from './components/navbar';
import Product from './pages/product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Callback function to update searchQuery
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
    <SearchProvider>
      <div>
        <Navbar onSearchChange={handleSearchChange} />
        <Routes>
          {/* Pass searchQuery as a prop */}
          <Route path="/" element={<Product searchQuery={searchQuery} />} />
          <Route path="/page/:page" element={<Product searchQuery={searchQuery} />} />
        </Routes>
      </div>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
