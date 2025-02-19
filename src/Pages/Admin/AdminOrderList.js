











import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Common/navbar";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [visibleOrderId, setVisibleOrderId] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "api-key": apiKey,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
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

  // const handleCancelOrder = async (orderId) => {
  //   const order = orders.find(o => o.orderId === orderId);
  //   if (!order || order.isCancelled || order.timeLeft <= 0) return;

  //   const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
  //   if (confirmCancel) {
  //     try {
  //       await axios.delete(`${backendUrl}/api/orders/api/orders/delete/${orderId}`);
  //       alert('Order cancelled successfully.');
  //       setOrders((prevOrders) => prevOrders.filter(order => order.orderId !== orderId));
  //     } catch (error) {
  //       console.error('Error cancelling order:', error);
  //       alert('Failed to cancel the order. Please try again.');
  //     }
  //   }
  // };

  const handleCancelOrder = async (orderId) => {
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
        console.error('Error cancelling order:', error);
        alert('Failed to cancel the order. Please try again.');
      }
    }
  };


  const handleDeleteOrder = async (orderId) => {
  
    const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    if (confirmCancel) {
      try {
       
        await axios.delete(`${backendUrl}/api/orders/delete/${orderId}`,  
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );
        alert('Order data deleted successfully.');
        setOrders((prevOrders) => prevOrders.filter(order => order.orderId !== orderId));
      } catch (error) {
        console.error('Error in deleting order:', error);
        alert('Failed to delete the order. Please try again.');
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
     

<div className="container">
<h5 className="my-4">Order List</h5>
{loading ? (
  <p className="text-center">Loading...</p>
) : orders.length === 0 ? (
  <p className="text-center">No orders found.</p>
) : (
  <div className="custom-order-List-sm ">
    <table className="table table-bordered table-striped">
    <thead className="thead-dark">
      <tr>
      <th className="text-center">Order ID</th>
                <th className="text-center">Total Amount</th>
             <th className="text-center">User Email</th>
            <th className="text-center">Order Date</th>
                <th className="text-center">Details</th>
      </tr>
    </thead>
    <tbody >
      {orders.map((order) => (
        <React.Fragment key={order.orderId} >
          <tr >
          <td className="text-center">{order.orderId}</td>
                    <td className="text-center">RS {order.grandTotal.toFixed(2)}</td>
                   <td className="text-center">{order.email}</td>
                    <td className="text-center">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-success mx-2 "
                        onClick={() => toggleDetails(order.orderId)}
                      >
                        {visibleOrderId === order.orderId ? "Hide Details" : "View Details"}
                      </button>
                      <button  onClick={() => handleDeleteOrder(order.orderId)}
                            className="btn btn-danger mx-2 my-2">Delete</button>
                    </td>
          </tr>
          {visibleOrderId === order.orderId && (
            <tr>
            <td colSpan="6">
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
          
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    onClick={() => handleCancelOrder(order.orderId)}
                    disabled={!order.canCancel}
                    className="btn btn-danger custom-btn"
                  >
                    Cancel Order
                  </button>
                  <div className="text-muted">Time left to cancel: {formatTime(order.timeLeft)}</div>
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

    </>
  );
};

export default AdminOrderList;
