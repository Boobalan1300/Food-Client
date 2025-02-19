









import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../../Common/navbar";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [removingFoodId, setRemovingFoodId] = useState(null); // Add removingFoodId state
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {

      const token = localStorage.getItem("token");
      if (!token) {
        setShowModal(true); 
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(`${backendUrl}/api/cartitems`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "api-key": apiKey,
          },
        });
        setCart(response.data);
      } catch {
        setShowModal(true);
      }
      finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const handleRemoveFromCart = async (foodId) => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");
    if (!token) {
      setShowModal(true); 
      return;
    }

    setRemovingFoodId(foodId); // Set removingFoodId to the current food's ID

    try {
      const response = await fetch(`${backendUrl}/api/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "api-key": apiKey,
        },
        body: JSON.stringify({ email: userEmail, foodId }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          errorDetails.message || "Failed to remove item from cart"
        );
      }

      const updatedCart = await response.json();
      setCart(updatedCart.cartItems);
    } catch {
      setShowModal(true); 
    } finally {
      setRemovingFoodId(null);
    }
  };

  const handleIncrement = async (foodId) => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");

    if (!token) {
      setShowModal(true); 
      return;
    }
  
    // Optimistically update the cart in the UI
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.foodId === foodId
          ? { ...item, quantity: (item.quantity || 1) + 1, total: (item.total || 0) + item.cost }
          : item
      )
    );
  
    try {
      const response = await fetch(`${backendUrl}/api/cart/increment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "api-key": apiKey,
        },
        body: JSON.stringify({ email: userEmail, foodId }),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to update item quantity");
      }
  
      const updatedCart = await response.json();
      setCart(updatedCart.cartItems);
    } catch {
      // Revert optimistic update if API call fails
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.foodId === foodId
            ? { ...item, quantity: (item.quantity || 1) - 1, total: (item.total || 0) - item.cost }
            : item
        )
      );
      setShowModal(true); 
    }
  };
  
  const handleDecrement = async (foodId) => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");
  
    // Optimistically update the cart in the UI
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.foodId === foodId
          ? { ...item, quantity: (item.quantity || 1) - 1, total: (item.total || 0) - item.cost }
          : item
      )
    );
  
    try {
      const response = await fetch(`${backendUrl}/api/cart/decrement`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "api-key": apiKey,
        },
        body: JSON.stringify({ email: userEmail, foodId }),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to update item quantity");
      }
  
      const updatedCart = await response.json();
      setCart(updatedCart.cartItems);
    } catch {
     
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.foodId === foodId
            ? { ...item, quantity: (item.quantity || 1) + 1, total: (item.total || 0) + item.cost }
            : item
        )
      );
    setShowModal(true); 
    }
  };
  

  const handleBuyNow = () => {
    navigate("/payment");
  };

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + (item.total || 0), 0)
      .toFixed(2);
  };

  return (
    <>

      <NavBar />


      <div className="container">
        <h2 className="cart-heading">Your Cart</h2>

        {loading ? (
  <div className="text-center">
    <p>Loading...</p>
  </div>
) : cart.length === 0 ? (
  <div className="text-center">
    <p>Your cart is empty.</p>
    {/* <img src={cart4} className="w-50" alt="Empty Cart"/> */}
  </div>
) : (
  <div className="d-none d-sm-block table-responsive">
    <table className="table table-striped">
      <thead>

                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Cost</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((food) => (
                  <tr key={food.foodId}>
                    <td>
                      <img
                        src={food.image}
                        alt={food.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{food.name}</td>
                    <td>Rs: {food.cost.toFixed(2)}</td>
                    <td>
                      <div className="d-flex">
                        <button
                          className="btn btn-success mx-2"
                          onClick={() => handleDecrement(food.foodId)}
                        >
                          -
                        </button>
                        {food.quantity || 1}
                        <button
                          className="btn btn-success mx-2"
                          onClick={() => handleIncrement(food.foodId)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>Rs: {food.total ? food.total.toFixed(2) : "0.00"}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFromCart(food.foodId)}
                        disabled={removingFoodId === food.foodId} // Disable while removing
                      >
                        {removingFoodId === food.foodId ? "Removing..." : "Remove"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cart.length > 0 && (
          <>
            <div className="d-block d-sm-none cart-horizontal">
              {/* Horizontal layout for small screens */}
              {cart.map((food) => (
                <div className="cart-item bg-card" key={food.foodId}>
                  <div className="col-5 text-center">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="img-thumbnail"
                    />
                  </div>
                  <div className="cart-item-details col-7">
                    <h5>{food.name}</h5>
                    <p>Cost: Rs {food.cost.toFixed(2)}</p>
                    <div className="d-flex">
                      <button
                        className="btn btn-success rounded-button"
                        onClick={() => handleDecrement(food.foodId)}
                      >
                        -
                      </button>
                      <p className="mx-2">
                        {food.quantity || 1}
                      </p>
                      <button
                        className="btn btn-success rounded-button"
                        onClick={() => handleIncrement(food.foodId)}
                      >
                        +
                      </button>
                    </div>
                    <p className="my-2">
                      Total: Rs {food.total ? food.total.toFixed(2) : "0.00"}
                    </p>
                    <div className="cart-item-actions text-start">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFromCart(food.foodId)}
                        disabled={removingFoodId === food.foodId} // Disable while removing
                      >
                        {removingFoodId === food.foodId ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center my-4">
              <p>Total amount: Rs {calculateTotalAmount()}</p>
              <button className="btn btn-primary" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header >
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to log in to access the Cart.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
};

export default CartPage;
