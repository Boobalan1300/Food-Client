


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../../Common/navbar';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const AllProductsComponent = () => {
  const navigate = useNavigate();
   const [foods, setFoods] = useState([]);
   const [addedItems, setAddedItems] = useState(new Set());
   const [loadingFoodId, setLoadingFoodId] = useState(null); 
   const [showModal, setShowModal] = useState(false);
   const [modalMessage, setModalMessage] = useState("");
   const [loading, setLoading] = useState(true);
 
 
 
   useEffect(() => {
     const fetchFoods = async () => {
       setLoading(true); 
       try {
         const response = await fetch(`${backendUrl}/api/foods`, {
           headers: {
             "api-key": apiKey,
           },
         });
 
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
 
         const data = await response.json();
         if (Array.isArray(data)) {
           setFoods(data);
         } else {
           console.error('Unexpected response format:', data);
         }
       } catch {
         showErrorModal("Failed to fetch foods. Please try again.");
       }
       finally{
         setLoading(false);
       }
     };
 
     const fetchCartItems = async () => {
       try {
         const token = localStorage.getItem('token');
         if (!token) return;
 
         const response = await fetch(`${backendUrl}/api/cartitems`, {
           headers: {
             'Authorization': `Bearer ${token}`,
             "api-key": apiKey,
           },
         });
 
         if (response.status === 401) {
           handleTokenExpiry();
           return;
         }
 
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
 
         const data = await response.json();
         if (Array.isArray(data)) {
           setAddedItems(new Set(data.map(item => item.foodId)));
         } else {
           console.error('Unexpected response format:', data);
         }
       } catch {
         showErrorModal("Failed to fetch cart items. Please try again.");
       }
     };
 
     fetchFoods();
     fetchCartItems();
   }, []);
 
   const handleAddToCart = async (food) => {
     const token = localStorage.getItem('token');
     const userEmail = localStorage.getItem('email');
     if (!token || !userEmail) {
       showErrorModal("You need to log in to add items to the cart.");
       return;
     }
 
     setLoadingFoodId(food.foodId);
 
     try {
       const response = await fetch(`${backendUrl}/api/cart/add`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,
           "api-key": apiKey,
         },
         body: JSON.stringify({
           email: userEmail,
           food: {
             foodId: food.foodId,
             name: food.name,
             image: food.image,
             cost: food.cost,
             quantity: 1,
           },
         }),
       });
 
       if (response.status === 401) {
         handleTokenExpiry();
         return;
       }
 
       if (!response.ok) {
         const errorDetails = await response.json();
         throw new Error(errorDetails.message || 'Failed to add item to cart');
       }
 
       const updatedCart = await response.json();
       if (Array.isArray(updatedCart.cartItems)) {
         setAddedItems(new Set(updatedCart.cartItems.map(item => item.foodId)));
       } else {
         console.error('Unexpected response format:', updatedCart);
       }
     } catch {
       showErrorModal("Failed to add item to cart. Please try again.");
     } finally {
       setLoadingFoodId(null);
     }
   };
 
   const handleTokenExpiry = () => {
     localStorage.clear(); 
     showErrorModal("Your session has expired. Please log in again.");
   };
 
   const showErrorModal = (message) => {
     setModalMessage(message);
     setShowModal(true);
   };
 
   
   return (
     <>
           <NavBar />
       <div className="container">
         <div className='custom-margin-sm'>
           <div>
             <h2 className='text-center my-5'> Featured <span className='text-muted'> Foods</span></h2>
           </div>
   
           {loading ? (
             <div className="text-center my-5">
               <p>Loading...</p>
             </div>
           ) : (
             <div className="row custom-horizontal-sm">
              {Array.isArray(foods) && foods.map((food) => (
                 <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4" key={food.foodId}>
                   <div className="card shadow position-relative card-width" style={{ minHeight: '420px' }}>
                     <div className='text-center col-sm-12 col-6'>
                       <img 
                         src={food.image} 
                         className="img-thumbnail " 
                         alt={food.name} 
                         style={{ width: '250px', height: '230px' }} 
                       />
                     </div>
                     <div className="card-body col-sm-12 col-6">
                       <h5 className="card-title">{food.name}</h5>
                       <p className="card-text">Cost: Rs.{food.cost}</p>
                       <div>
                         <button
                           className="btn btn-success custom-btn"
                           onClick={() => handleAddToCart(food)}
                           disabled={addedItems.has(food.foodId) || loadingFoodId === food.foodId} 
                         >
                           {loadingFoodId === food.foodId
                             ? "Adding..."
                             : addedItems.has(food.foodId) 
                             ? "Added" 
                             : "Add to Cart"
                           }
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>

       
  <Modal show={showModal} centered>
  <Modal.Body className="text-center">
    <h5>You need to log in to add items to the cart.</h5>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={() => navigate("/login")}>
      Login
    </Button>
  </Modal.Footer>
</Modal>

     </>
   );
   
};

export default AllProductsComponent;






