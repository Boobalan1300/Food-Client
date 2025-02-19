





import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../Common/navbar";
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";


const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [visibleOrderId, setVisibleOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email"); 

  
      if (!token || !email)  {
        setShowModal(true);
        return;
      }
  
      try {
        setLoading(true);

        const response = await axios.get(`${backendUrl}/api/particular/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "api-key": apiKey,
          },
          params: {
            email, 
          },
        });
  
        // console.log("Orders fetched:", response.data); 
        setOrders(response.data);
      }  catch {
        setShowModal(true);
      }
      finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  

  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          const timeLeft = Math.max(0, (new Date(order.cancelExpiration) - new Date()) / 1000);
          return { ...order, timeLeft, canCancel: !order.isCancelled && timeLeft > 0 };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleDetails = (orderId) => {
    setVisibleOrderId(visibleOrderId === orderId ? null : orderId);
  };

  const handleCancelOrder = async (orderId) => {

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email"); 


    if (!token || !email)  {
      setShowModal(true);
      return;
    }

    const order = orders.find(o => o.orderId === orderId);
    if (!order || order.isCancelled || order.timeLeft <= 0) return;

    const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    if (confirmCancel) {
      try {
        await axios.delete(`${backendUrl}/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "api-key": apiKey,
          },
        });
        alert('Order cancelled successfully.');
        setOrders((prevOrders) => prevOrders.filter(order => order.orderId !== orderId));
      } catch (error) {
        setShowModal(true);
        console.error('Error cancelling order:', error);
        // alert('Failed to cancel the order. Please try again.');
      }
    }
  };


  const formatTime = (seconds) => {
    
    seconds = Math.floor(Number(seconds) || 0);
    
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  
  return (
    <>
      <NavBar />


      

      <div className="custom-margin-order-list">
      <div className="container">
        <h5 className="my-4">Order List</h5>
        {loading ? (
  <p className="text-center">Loading...</p>
) : orders.length === 0 ? (
  <p className="text-center">No orders found.</p>
) : (
  <div className="custom-order-List-sm">
    <table className="table table-bordered table-striped">
      <thead className="thead-dark">

              <tr>
                <th className="text-center">Order ID</th>
                <th className="text-center">Total Amount</th>
                <th className="text-center">Order Date</th>
                <th className="text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.orderId}>
                  <tr>
                    <td className="text-center">{order.orderId}</td>
                    <td className="text-center">Rs.{order.grandTotal.toFixed(2)}</td>
                    <td className="text-center">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-success custom-btn"
                        onClick={() => toggleDetails(order.orderId)}
                      >
                        {visibleOrderId === order.orderId ? "Hide Details" : "View Details"}
                      </button>
                    </td>
                  </tr>
                  {visibleOrderId === order.orderId && (
                    <tr>
                    <td colSpan="4">
                      <div className="order-details">
                        <table className="table table-bordered table-striped">
                          <thead className="thead-dark">
                            <tr>
                            <th className="text-center">Image</th>
                              <th className="text-center">Food Name</th>
                              <th className="text-center">Cost</th>
                              <th className="text-center">Quantity</th>
                              <th className="text-center">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.cartItems.map((item) => (
                              <tr key={item.foodId}>
                                <td className="text-center">
                                  <img src={item.image} className="img-thumbnail img-thumbnail-size"></img>
                                </td>
                                <td className="align-middle text-center">{item.name}</td>
                                <td className="align-middle text-center">Rs.{item.cost}</td>
                                <td className="align-middle text-center">{item.quantity}</td>
                                <td className="align-middle text-center">Rs.{item.total.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                  
                        <div className="d-flex justify-content-end align-items-center mt-3 my-5">
                          <button
                            onClick={() => handleCancelOrder(order.orderId)}
                            disabled={!order.canCancel}
                            className="btn btn-danger custom-btn"
                          >
                            Cancel Order
                          </button>
                          <div className="text-muted mx-3">Time left to cancel: {formatTime(order.timeLeft)}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          </div>
          
        )}
      </div>

      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header >
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to log in to access the Orders.</Modal.Body>
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

export default OrderList;
