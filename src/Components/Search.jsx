import { useState } from 'react';
import useBreedList from '../Fetching API/useBreedList';
import Results from './Results';
import { useQuery } from '@tanstack/react-query';
import fetchSearch from '../Fetching API/fetchSearch';
import { useSelector } from 'react-redux';
// import AdoptedPetContext from '../Fetching/AdoptedPetContext';

const Animals = ['bird', 'cat', 'dog', 'reptile', 'rabbit'];

const Search = () => {
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);
  const [formState, setFormState] = useState({
    location: '',
    animal: '',
    breed: '',
  });

  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  // const [adoptedPet] = useContext(AdoptedPetContext);
  const results = useQuery(['search', formState], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          setFormState({
            location: formData.get('location'),
            animal: formData.get('animal'),
            breed: formData.get('breed'),
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]}></img>
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {Animals.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Sumbit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default Search;
