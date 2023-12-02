import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/EmployeeList.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/v1/emp/employees');
                setEmployees(response.data);
            } catch (error) {
                alert('Failed to fetch employees');
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3003/api/v1/emp/employees/${id}`);
            setEmployees(currentEmployees =>
                currentEmployees.filter((emp) => emp._id !== id));
        } catch (error) {
            alert('Failed to delete employee');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="page-container">
            <div className="top-right">
                {localStorage.getItem('user') ? (
                    <button onClick={logout} className="logout-button">Logout</button>
                ) : (
                    <Link to="/login" className="signin-button">Sign In</Link>
                )}
            </div>
            <div className="employee-list-container">
                <h2>Employee List</h2>
                <Link to="/add-employee" className="add-employee-button">Add Employee</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Link to={`/view-employee/${employee._id}`} className="view-button">View</Link>

                                <button onClick={() => handleDelete(employee._id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default EmployeeList;