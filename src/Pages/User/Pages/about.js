import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import food1 from '../Images/food1.png';
import food2 from '../Images/food2.png';
import img32 from '../Images/img32.jpg'
const AboutComponent = () => {
    return (
        <>
           <div className='container my-5'>
            <div className='text-center my-5'>
                <h2 className='text-success'>VEG <small className='text-muted'>And </small><span className='text-danger'>Non Veg</span></h2>
            </div>
            <div className='row'>
                <div className='col-lg-6 col-md-12  mb-4'>
                    <div className='card about-bg-1'>
                        <div className='row g-0'>
                            <div className='col-md-6'>
                                <img src={food1} className='img-fluid' alt='Food' />
                            </div>
                            <div className='col-md-6 d-flex flex-column justify-content-center p-4'>
                                <p className='fw-bolder'>NON-VEG</p>
                                <p className='text-muted'>
                                    Non-vegetarian food (in Indian English sometimes shortened to non-veg food) contains meat (red meat, poultry, seafood, or the flesh of any other animal), and sometimes, eggs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className='col-lg-6 col-md-12 mb-4'>
                    <div className='card about-bg-2'>
                        <div className='row g-0'>
                            <div className='col-md-6 '>
                                <img src={food2} className='img-fluid' alt='Food' />
                            </div>
                            <div className='col-md-6 d-flex flex-column justify-content-center p-4'>
                                <p className='fw-bolder'>VEG</p>
                                <p className='text-muted'>
                                vegetarian diets exclude meat, poultry, seafood and dairy products, but allow eggs.Lacto-ovo vegetarian diets exclude meat, fish and poultry, but allow dairy products and eggs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
         <div className='my-3 img-custom-height'>
         <img src={img32} className='w-100 img-custom-height'></img>
        </div>
        </>
     
    );
};

export default AboutComponent;
