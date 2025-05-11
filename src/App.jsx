import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TrackingPage from './components/TrackingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to sample tracking if no route is given */}
        <Route path="/" element={<Navigate to="/track/AA/GOA1UO" />} />
        
        {/* Route for QR-scanned links */}
        <Route path="/track/:carrier/:code" element={<TrackingPage />} />

        {/* Catch-all route */}
        <Route path="*" element={<div className="text-center mt-20 text-gray-600">404 – Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
