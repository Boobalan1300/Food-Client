

import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const ProtectedRoute = ({ element: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setShowModal(true);
        return;
      }

      try {
        const response = await axios.get(`${backendUrl}/api/check-auth`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "api-key": apiKey,
          }
        });

        setIsAuthenticated(response.data.valid);
      } catch (error) {
        console.error('Error checking auth:', error.message);
        setIsAuthenticated(false);
        setShowModal(true);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      {isAuthenticated ? Component : null}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header >
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to be logged in to access this page.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProtectedRoute;
