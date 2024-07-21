import React, { useState } from 'react';
import ReactDom from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Search from './Search';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Details from './Details';
import { Provider } from 'react-redux';
// import AdoptedPetContext from '../Fetching/AdoptedPetContext';
import store from '../Redux/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Adopt Me!!</Link>
          </header>
          {/* <AdoptedPetContext.Provider value={adoptedPet}> */}
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<Search />} />
          </Routes>
          {/* </AdoptedPetContext.Provider> */}
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = ReactDom.createRoot(container);
root.render(<App />);
