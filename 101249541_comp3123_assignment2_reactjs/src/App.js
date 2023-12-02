import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import './css/App.css';

const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
              path="/"
              element={
                <PrivateRoute>
                  <EmployeeList />
                </PrivateRoute>
              }
          />
          <Route
              path="/add-employee"
              element={
                <PrivateRoute>
                  <AddEmployee />
                </PrivateRoute>
              }
          />
          <Route
              path="/view-employee/:id"
              element={
                <PrivateRoute>
                  <ViewEmployee />
                </PrivateRoute>
              }
          />
          <Route
              path="/update-employee/:id"
              element={
                <PrivateRoute>
                  <UpdateEmployee />
                </PrivateRoute>
              }
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
  );
}

export default App;
