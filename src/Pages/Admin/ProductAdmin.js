




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const AdminProducts = () => {
    const [foods, setFoods] = useState([]);
    const [addedItems, setAddedItems] = useState(new Set());
    const [editingFood, setEditingFood] = useState(null); 
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        cost: ''
    });
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true); 
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }

                const response = await axios.get(`${backendUrl}/api/foods`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "api-key": apiKey,
                    },
                });

                if (response.status === 200) {
                    setFoods(response.data);
                } else {
                    handleAuthError(response.status);
                }
            } catch (error) {
                console.error('Error fetching foods:', error);
                navigate('/');
            }
            finally {
                setLoading(false); // Stop loading when request is complete
            }
        };

        fetchFoods();
    }, [navigate]);

    const handleAuthError = (status) => {
        if (status === 401 || status === 403) {
            navigate('/');
        } else {
            console.error('Unhandled status:', status);
        }
    };

    const deleteParticular = async (food) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${backendUrl}/api/foods/${food.foodId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "api-key": apiKey,
                },
            });
            setFoods(foods.filter(f => f.foodId !== food.foodId));
            setAddedItems(new Set([...addedItems, food.foodId]));
        } catch (error) {
            console.error('Error deleting food:', error);
        }
    };

    const handleUpdateClick = (food) => {
        setEditingFood(food.foodId);
        setFormData({
            name: food.name,
            image: food.image,
            cost: food.cost
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSaving(true); // Set saving to true when starting save operation
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${backendUrl}/api/foods/${editingFood}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "api-key": apiKey,
                },
            });

            if (response.status === 200) {
                setFoods(foods.map(food => food.foodId === editingFood ? response.data.food : food));
                setEditingFood(null); 
            }
        } catch (error) {
            console.error('Error updating food:', error);
        } finally {
            setSaving(false); // Reset saving to false after operation
        }
    };

    const handleClose = () => setEditingFood(null); 

    return (
        <div className="row">
            {loading ? (
                <p className="text-center">Loading foods...</p>
            ) : foods.length === 0 ? (
                <p className="text-center">No food items found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center">Image</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Cost</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(foods) &&
                                foods.map((food) => (
                                    <tr key={food.foodId}>
                                        <td className="text-center">
                                            <img src={food.image} alt={food.name} style={{ width: '100px', height: '80px' }} />
                                        </td>
                                        <td className="text-center">{food.name}</td>
                                        <td className="text-center">Rs {food.cost}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-danger mx-2 my-1"
                                                onClick={() => deleteParticular(food)}
                                                disabled={addedItems.has(food.foodId)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="btn btn-success mx-2 my-1"
                                                onClick={() => handleUpdateClick(food)}
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
    
            {/* Modal for editing food items */}
            <Modal show={!!editingFood} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Food Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cost">Cost</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cost"
                                name="cost"
                                value={formData.cost}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button variant="primary" type="submit" className="mt-3" disabled={saving}>
                            {saving ? 'Saving...' : 'Save'}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
    
}

export default AdminProducts;
