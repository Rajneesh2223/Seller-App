import React from 'react';
import Car2 from '../assets/2.jpg';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BsSpeedometer } from 'react-icons/bs';
import { PiSteeringWheelFill } from 'react-icons/pi';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import '../index.css'
const carNames = ["Mustang", "Mercedes", "Camry", "Accord", "Fusion", "Corolla", "Cruze", "Malibu", "Charger", "Challenger", "Impala", "Sentra", "Altima", "Maxima", "Taurus", "F-150", "Explorer", "Escape", "Rav4", "Highlander"];

const generateMockData = () => {
  const mockData = [];

  for (let i = 1; i <= 100; i++) {
    const car = {
      id: i,
      name: getRandomCarName(), // Call a function to get a random car name
      year: Math.floor(Math.random() * (2023 - 1990 + 1)) + 1990,
      seater: Math.floor(Math.random() * (7 - 2 + 1)) + 2,
      hybrid: Math.random() < 0.5,
      automatic: Math.random() < 0.5,
      petrol: Math.random() < 0.5,
      price: Math.floor(Math.random() * (80000 - 10000 + 1)) + 10000,
    };

    mockData.push(car);
  }

  return mockData;
};

function getRandomCarName() {
  const randomIndex = Math.floor(Math.random() * carNames.length);
  return carNames[randomIndex];
}
  

function Product( ) {
  const mockData = generateMockData();
  const itemsPerPage = 8; 
  const { page } = useParams(); 
  const navigate = useNavigate();
  const currentPage = parseInt(page) || 1;
  const {searchQuery} = useSearch();
  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const maxButtons = 10;
  const pageNumbers = [];
  let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
  let endPage = startPage + maxButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxButtons + 1, 1);
  }

  // Handle pagination when "Next" or "Previous" buttons are clicked
  const nextPage = () => {
    // Update the URL to the next page
    navigate(`/page/${currentPage + 1}`);
  };

  const prevPage = () => {
    // Update the URL to the previous page
    navigate(`/page/${currentPage - 1}`);
  };
  const filteredData = mockData.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-gray-100 flex flex-wrap justify-center">
      {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((car) => (
        <div key={car.id} className="bg-gray-200 w-[250px] h-[340px] p-2 m-3 mt-20">
        <div className="flex justify-center items-center">
          <img src={Car2} alt="Car 2" className="w-[230px] h-[200px] rounded object-cover" />
        </div>
        <div className="text-white mt-2">
          <div className="flex items-center justify-between">
            <h1 className='text-black font-bold font-mono '>{car.name}</h1>
            <span className="text-[12px] text-black border-dashed border-2 border-red-600 rounded-full px-4">{car.year}</span>
          </div>
          <ul className="grid grid-cols-2 mt-2 p-2 mr-[50px]">
            <li className="flex items-center gap-2">
              < BsFillPeopleFill  style={{ color: 'black' }}/>
              <span className="text-[12px] text-center text-black">{car.seater} Seater</span>
            </li>
            <li className="flex items-center gap-2">
              <BsFillFuelPumpFill style={{ color: 'black' }} />
              <span className="text-[12px] text-black">{car.hybrid ? 'Hybrid' : 'Not Hybrid'}</span>
            </li>
            <li className="flex items-center gap-2">
              <BsSpeedometer  style={{ color: 'black' }}/>
              <span className="text-[12px] text-black">{car.petrol ? 'Petrol' : 'Not Petrol'}</span>
            </li>
            <li className="flex items-center gap-2">
              <PiSteeringWheelFill style={{ color: 'black' }} />
              <span className="text-[12px] text-black">{car.automatic ? 'Automatic' : 'Manual'}</span>
            </li>
          </ul>
          <div className="flex justify-between mt-1">
            <h2 className='text-black'>${car.price}</h2>
            <button className="bg-red-400 text-[12px] rounded-full px-2 py-1 hover:bg-red-600">RENT NOW</button>
          </div>
        </div>
      </div>
     ))}
      <div className="mt-4  justify-center">
        <button
          className="bg-indigo-500 text-white px-3 py-1 rounded"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${
              pageNumber === currentPage ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-700'
            } px-3 py-1 rounded ml-2`}
            onClick={() => navigate(`/page/${pageNumber}`)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="bg-indigo-500 text-white px-3 py-1 rounded ml-2"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Product;

  