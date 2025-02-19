


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../../Common/navbar";
import axios from "axios";
import FooterCompoent from "../../../Common/footer";


const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const PaymentPage = () => {
  const [cart, setCart] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [Message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);


  const [formData, setFormData] = useState({
    email: "",
    address: "",
    name: "",
    contact: "",
  });
  const navigate = useNavigate();
  const profileEmail = localStorage.getItem("email");

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
  }, []);

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + (item.total || 0), 0)
      .toFixed(2);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      
           setShowModal(true);
      return;
    }

    if (cart.length === 0) {
      setMessage("Please add products,Your Cart is Empty");
      setTimeout(() => {
        navigate("/allProducts");
      }, 3000);
      return;
    }

    setIsProcessing(true);

    try {
      await axios.post(
        `${backendUrl}/api/orders`,
        
        {
          ...formData,
          cartItems: cart,
          profileEmail,
          grandTotal: calculateTotalAmount(),
          orderId: Math.floor(Math.random() * 1000000), 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      setSuccessMessage("Order successfully placed!");
      setTimeout(() => {
        navigate("/orderList");
      }, 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
    }finally {
      setIsProcessing(false); 
    }
  };

  return (
    <>
      <NavBar />



      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-6 mt-3">
            <div className="card shadow-lg ">
              <div className="card-body mt-4">
                <h5 className="card-title text-center mb-4">Cart Items</h5>
                <div className="table-container">
                {loading ? (
  <p className="text-center">Loading...</p>
) : cart.length === 0 ? (
  <div className="text-center payment-left-part">
    <p>Your cart is empty.</p>
    {/* <img src={cart2} className="w-50"></img> */}
  </div>
) : (
                    <div className="table-wrapper">
                      <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                          <tr>
                            <th className="text-center">Image</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Cost</th>
                            {/* <th className="text-center">Food ID</th> */}
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((food) => (
                            <tr key={food.foodId}>
                              <td className="text-center">
                                <img
                                  src={food.image}
                                  alt={food.name}
                                  className="img-thumbnail h-50"
                                />
                              </td>
                              <td className="align-middle text-center">
                                {food.name}
                              </td>
                              <td className="align-middle text-center">
                                Rs {food.cost}
                              </td>
                              {/* <td className="align-middle text-center">{food.foodId}</td> */}
                              <td className="align-middle text-center">
                                {food.quantity || 1}
                              </td>
                              <td className="align-middle text-center">
                                Rs {food.total ? food.total.toFixed(2) : "0.00"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <h6 className="text-end my-4">
                  Total amount: Rs {calculateTotalAmount()}
                </h6>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card shadow-lg my-3">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="p-5">
                  <h4 className="card-title text-center ">Payment Details</h4>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">
                      Contact
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={isProcessing}>
  {isProcessing ? "Processing..." : "Proceed"}
</button>

                </form>
                {successMessage && (
                  <div className="alert alert-success " role="alert">
                    {successMessage}
                  </div>
                )}
                {Message && (
                  <div className="alert alert-danger" role="alert">
                    {Message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header >
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to log in to access the Payment.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
      
      <FooterCompoent />
    </>
  );
};

export default PaymentPage;
