





import React from 'react';
import FoodForm from './form';
import NavBar from '../../Common/navbar';
import AdminOrderList from './AdminOrderList';
import PasswordPrompt from './PasswordPromt';
import AdminProducts from './ProductAdmin';


const AdminComponent = () => {
    const [isUnlocked, setIsUnlocked] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('addProducts'); 
    const handleUnlock = () => {
        setIsUnlocked(true);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            {isUnlocked ? (
                <>
                    <NavBar />
                    <div className="container mt-4 ">
                        <div className="mb-4">
                            <button
                                className={`btn btn-primary mx-2 my-2   ${activeTab === 'addProducts' ? 'active' : ''}`}
                                onClick={() => handleTabChange('addProducts')}
                            >
                                Add Products
                            </button>
                            <button
                                className={`btn btn-primary mx-2 my-2 ${activeTab === 'viewOrders' ? 'active' : ''}`}
                                onClick={() => handleTabChange('viewOrders')}
                            >
                                View Orders
                            </button>
                            <button
                                className={`btn btn-primary mx-2 my-2 ${activeTab === 'viewProducts' ? 'active' : ''}`}
                                onClick={() => handleTabChange('viewProducts')}
                            >
                                View Products
                            </button>
                        </div>

                        {activeTab === 'addProducts' && <FoodForm />}
                        {activeTab === 'viewOrders' && <AdminOrderList />}
                        {activeTab === 'viewProducts' && <AdminProducts />}
                    </div>
                </>
            ) : (
                <PasswordPrompt onUnlock={handleUnlock} />
            )}
        </>
    );
};

export default AdminComponent;
