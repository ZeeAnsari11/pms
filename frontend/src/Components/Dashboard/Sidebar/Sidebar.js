import React, {useState, useEffect} from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [data, setData] = useState([]);
    let authToken = sessionStorage.getItem('auth_token')

    useEffect(() => {
        if (authToken) {
            fetch("http://0.0.0.0:8000/api/projects/", {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${authToken}`,
                },
            })
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch(err => console.error(err));
        }

    }, []);


    return (
        <div className="sidebar">
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;