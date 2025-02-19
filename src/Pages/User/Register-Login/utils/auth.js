

import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;
// console.log(backendUrl)



async function signUp(email, password) {
  try {
  
    const response = await axios.post(`${backendUrl}/api/auth/signup`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
        "api-key": apiKey,
      }
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    
    throw error; 
  }
}

async function login(email, password) {
  try {


    const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
        "api-key": apiKey,
      }
    });

    
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response ? error.response.data : error.message); // Log detailed error response
    throw error;
  }
}



export { signUp, login };
