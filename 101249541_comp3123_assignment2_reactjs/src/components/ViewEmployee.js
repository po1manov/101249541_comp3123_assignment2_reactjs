import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../css/ViewEmployee.css';

function ViewEmployee() {
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };


    useEffect(() => {
        async function fetchEmployee() {
            try {
                const response = await axios.get(`http://localhost:3003/api/v1/emp/employees/${id}`);
                setEmployee(response.data.data);
            } catch (error) {
                alert('Failed to fetch employee');
            }
        }

        fetchEmployee();
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>;
    }


    return (
        <div className="view-employee-container">
            <div className="top-right">
                {localStorage.getItem('user') ? (
                    <button onClick={logout} className="logout-button">Logout</button>
                ) : (
                    <Link to="/login" className="signin-button">Sign In</Link>
                )}
            </div>

            <div className="navigation-buttons">
                <Link to="/" className="view-list-button">Back to Employee List</Link>
            </div>

            <h2>Employee Details</h2>
            <div className="employee-detail">
                <strong>First Name:</strong> {employee.first_name}
            </div>
            <div className="employee-detail">
                <strong>Last Name:</strong> {employee.last_name}
            </div>
            <div className="employee-detail">
                <strong>Email:</strong> {employee.email}
            </div>
            <div className="employee-detail">
                <strong>Gender:</strong> {employee.gender}
            </div>
            <div className="employee-detail">
                <strong>Salary:</strong> {employee.salary}
            </div>
        </div>
    );
}

export default ViewEmployee;
