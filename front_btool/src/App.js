import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import MainPage from './MainPage'; // Import the MainPage component
import PcPage from './PcPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/PcPage" element={<PcPage />} />
          // Define other routes as needed
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
