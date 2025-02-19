

// import React, { useState, useEffect } from "react";
// import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import logo from "./common-img/logo.png";
// import axios from "axios";

// import "./navbar.css";

// const backendUrl = process.env.REACT_APP_BACKEND_URL;
// const apiKey = process.env.REACT_APP_API_KEY;

// function NavBar() {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       getUserProfile(token)
//         .then((data) => {
//           if (data?.email) {
//             setEmail(data.email);
//             localStorage.setItem("email", data.email);
//           }
//         })
//         .catch((error) => {
//           if (error.response && error.response.status === 401) {
//             handleLogOut(); // Token expired, log the user out
//           }
//         });
//     }
//   }, []);

//   async function getUserProfile(token) {
//     try {
//       const response = await axios.get(`${backendUrl}/api/user/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "api-key": apiKey,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }

//   const handleLogOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     setEmail("");
//   };

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary sticky-top">
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           <img
//             src={logo}
//             style={{ maxWidth: "50px", height: "auto" }}
//             alt="Logo"
//           />
//           <span className=" ">Taking FOOD</span>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link
//               as={Link}
//               to="/"
//               className={location.pathname === "/" ? "nav-link active" : "nav-link"}
//             >
//               Home
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/allProducts"
//               className={location.pathname === "/allProducts" ? "nav-link active" : "nav-link"}
//             >
//               All Products
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/cartPage"
//               className={location.pathname === "/cartPage" ? "nav-link active" : "nav-link"}
//             >
//               Cart
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/payment"
//               className={location.pathname === "/payment" ? "nav-link active" : "nav-link"}
//             >
//               Payment
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/orderList"
//               className={location.pathname === "/orderList" ? "nav-link active" : "nav-link"}
//             >
//               Orders
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/admin"
//               className={location.pathname === "/admin" ? "nav-link active" : "nav-link"}
//             >
//               Admin Page
//             </Nav.Link>

//             {email ? (
//               <NavDropdown title={email} id="basic-nav-dropdown" align="end">
//                 <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
//               </NavDropdown>
//             ) : (
//               <Button variant="primary" className="rounded-5" onClick={() => navigate("/login")}>
//                 Login / Register
//               </Button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBar;








import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./common-img/logo.png";
import axios from "axios";

import "./navbar.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiKey = process.env.REACT_APP_API_KEY;

function NavBar() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUserProfile(token)
        .then((data) => {
          if (data?.email) {
            setEmail(data.email);
            localStorage.setItem("email", data.email);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert("Session is expired, need to login");
            handleLogOut(); 
          }
        });
    }
  }, []);

  async function getUserProfile(token) {
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "api-key": apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setEmail("");
    navigate("/")
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            style={{ maxWidth: "50px", height: "auto" }}
            alt="Logo"
          />
          <span className=" ">Taking FOOD</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "nav-link active" : "nav-link"}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/allProducts"
              className={location.pathname === "/allProducts" ? "nav-link active" : "nav-link"}
            >
              All Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cartPage"
              className={location.pathname === "/cartPage" ? "nav-link active" : "nav-link"}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/payment"
              className={location.pathname === "/payment" ? "nav-link active" : "nav-link"}
            >
              Payment
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/orderList"
              className={location.pathname === "/orderList" ? "nav-link active" : "nav-link"}
            >
              Orders
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin"
              className={location.pathname === "/admin" ? "nav-link active" : "nav-link"}
            >
              Admin Page
            </Nav.Link>

            {email ? (
              <NavDropdown title={email} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="primary" className="rounded-5" onClick={() => navigate("/login")}>
                Login / Register
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
