import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import ErrorBoundary from './components/shared/error-boundary';
import './index.scss';
import HomePage from './pages/home-page';
import Details from './pages/details-page';
import NotFound from './pages/not-found-page';
import TestPage from './pages/test-page';

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home/*" element={<HomePage />}>
              <Route path="details/:id" element={<Details />} /> {}
            </Route>
            <Route path="/test/:id" element={<TestPage />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
