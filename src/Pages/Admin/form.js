



import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const FoodForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    cost: ''
  });

  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData(prevState => ({
        ...prevState,
        image: reader.result
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/foods`, formData, {
        headers: {
          "api-key": apiKey,
        },
      });

      if (response.status === 201) {
        alert('Food added successfully!');
        setFormData({
          name: '',
          image: '',
          cost: ''
        });
      } else {
        alert('Failed to add food.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4 fs-5">Add New Food</h2>
      <form onSubmit={handleSubmit} className="bg-add-food p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="foodName" className="form-label">Food Name</label>
          <input
            type="text"
            id="foodName"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="foodImage" className="form-label">Image</label>
          <input
            type="file"
            id="foodImage"
            accept="image/*"
            className="form-control"
            onChange={handleImageUpload}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="foodCost" className="form-label">Cost</label>
          <input
            type="number"
            id="foodCost"
            name="cost"
            className="form-control"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Food'}
        </button>
      </form>
    </div>
  );
};

export default FoodForm;
