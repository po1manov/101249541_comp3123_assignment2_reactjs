// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../css/Navbar.css';
//
// function Navbar() {
//     const navigate = useNavigate();
//     const isAuthenticated = localStorage.getItem('user') !== null;
//
//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         navigate('/login');
//     };
//     return (
//         <div className="navbar">
//             {isAuthenticated ? (
//                 <button onClick={handleLogout} className="logout-button">Logout</button>
//             ) : (
//                 <div>
//                     <button onClick={() => navigate('/signup')} className="signup-button">Signup</button>
//                     <button onClick={() => navigate('/login')} className="login-button">Login</button>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default Navbar;
