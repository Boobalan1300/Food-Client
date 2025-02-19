import React from "react";

function FooterCompoent() {
  return (
    <>
    <footer className='bg-dark text-light py-4'>
      <div className='container'>
        <div className='row'>
         
          <div className='col-lg-4 col-md-6 mb-3'>
            <h5>Menu</h5>
            <ul className='list-unstyled'>
              <li><a  className='text-light text-decoration-none'>Home</a></li>
              <li><a className='text-light text-decoration-none'>About Us</a></li>
              <li><a  className='text-light text-decoration-none'>Services</a></li>
              <li><a  className='text-light text-decoration-none'>Contact</a></li>
            </ul>
          </div>

          
          <div className='col-lg-4 col-md-6 mb-3'>
            <h5>Contact</h5>
            <address>
              <p className='mb-1'> Anna Nagar</p>
              <p className='mb-1'>City, State, 12345</p>
              <p className='mb-1'>Phone: <a className='text-light text-decoration-none'>7907497312</a></p>
              <p className='mb-1'>Email: <a  className='text-light text-decoration-none'>admin@gmail.com</a></p>
            </address>
          </div>

        
          <div className='col-lg-4 col-md-12 mb-3'>
            <h5>Additional address</h5>
            <p>about the company.</p>
          </div>
        </div>
       
      </div>
    </footer>
    

    </>
   
  )
}

export default FooterCompoent;


