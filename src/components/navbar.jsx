import React from 'react';
import { useSearch } from '../context/SearchContext';

function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='w-full h-[51px] px-2 fixed'>
      <div className='bg-gray-500 flex flex-row justify-start items-center gap-5 py-2 px-2 mx-5 rounded-md mt-1'>
        <div className='flex mx-5'>
          <input
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearchChange}
            className='rounded-full px-2 w-[250px] h-[30px]'
          />
        </div>
        <div>
          <ul className='flex flex-row gap-5'>
            <li>
              <a href='#1'>Relevance</a>
            </li>
            <li>
              <a href='#2'>All Brands</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
