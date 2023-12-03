// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../css/EmployeeList.css';
//
//
// function UpdateEmployee() {
//     const [employee, setEmployee] = useState({
//     });
//     const { id } = useParams();
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         async function fetchEmployee() {
//             try {
//                 const response = await axios.get(`/api/employees/${id}`);
//                 setEmployee(response.data);
//             } catch (error) {
//                 alert('Failed to fetch employee data');
//             }
//         }
//
//         fetchEmployee();
//     }, [id]);
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.put(`/api/employees/${id}`, employee);
//             alert('Employee updated');
//             navigate('/employee-list');
//         } catch (error) {
//             alert('Failed to update employee');
//         }
//     };
// }
//
// export default UpdateEmployee;