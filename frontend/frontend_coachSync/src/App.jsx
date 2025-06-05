// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CoachProvider } from './components/CoachInfo';
import Home from './pages/Home';
import ClientePage from './pages/ClientPage';
import ClientDetails from './components/ClientDetails'; // Already used
import ClientInfo from './components/ClientInfo'; // Import ClienteInfo

import './App.css';

function App() {
  return (
    <Router>
      <CoachProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<ClientePage />} />
          {/* Route for Client Ficha */}
          <Route path="/cliente/:id/info" element={<ClientInfo />} />
          {/* Route for Client History and Progress */}
          <Route path="/cliente/:id/details" element={<ClientDetails />} />
        </Routes>
      </CoachProvider>
    </Router>
  );
}

export default App;