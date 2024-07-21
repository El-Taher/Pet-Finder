import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { adopt } from '../Redux/adoptedPetSlice';
import fetchPetDetails from '../Fetching API/fetchPetDetails';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import { useState } from 'react';
import Modal from './Modal';

const Details = () => {
  const { id } = useParams();
  const results = useQuery(['details', id], fetchPetDetails);
  // const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">⚙️</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];
  // throw new Error();
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button
          onClick={() => {
            // setAdoptedPet(pet);
            // dispatch(adopt(pet));
            // navigate('/');
            setShowModal(true);
          }}
        >
          Adopt {pet.name}
        </button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(adopt(pet));
                    navigate('/');
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

// const DetailsErrorBoundary = () => (
//   <ErrorBoundary>
//     <Details />
//   </ErrorBoundary>
// );

export default Details;
