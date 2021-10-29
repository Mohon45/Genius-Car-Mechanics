import React, { useEffect, useState } from 'react';

const ManageService = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, []);

    const handleDeleteBtn = id => {
        const url = `http://localhost:5000/services/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
           if(data.deletedCount){
               alert('deleted')
            const remaining = services.filter(service => service._id !== id)
            setServices(remaining);
           }
        })
    }
    return (
        <div>
            <h2>Manage Services</h2>
            {
                services.map(service => <div>
                    <h3>{service.name}</h3>
                    <button onClick={() => handleDeleteBtn(service._id)}>Delete</button>
                </div>)
            }
        </div>
    );
};

export default ManageService;