import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddEmployee.css';
import {Link, useNavigate} from 'react-router-dom';

function AddEmployee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        salary: ''
    });
    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };
    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!employee.first_name || !employee.last_name || !employee.email || !employee.gender || !employee.salary) {
            alert('Please fill in all fields');
            return;
        }
        try {
            await axios.post('http://localhost:3003/api/v1/emp/employees', employee);
            alert('Employee added');
            navigate('/');
        } catch (error) {
            alert(`Failed to add employee: ${error.response.data.message}`);
        }
    };


    return (
        <div className="add-employee-container">
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

            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={employee.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={employee.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Gender:</label>
                    <select name="gender" value={employee.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Salary:</label>
                    <input
                        type="number"
                        name="salary"
                        value={employee.salary}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployee;
