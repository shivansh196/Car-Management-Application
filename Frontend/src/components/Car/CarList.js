import React, { useState, useEffect } from 'react';
import { getCars, searchCars } from '../../services/api';
import { useHistory } from 'react-router-dom';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const fetchCars = async () => {
    const { data } = await getCars();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      const { data } = await searchCars(searchTerm);
      setCars(data);
    } else {
      fetchCars();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Cars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {cars.map((car) => (
          <li key={car._id} onClick={() => history.push(`/cars/${car._id}`)}>
            {car.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
