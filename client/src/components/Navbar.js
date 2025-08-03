import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaLinkedin, FaUser, FaSignOutAlt, FaHome, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <FaLinkedin className="navbar-logo" />
            <span>LinkedIn Community</span>
          </Link>

          <div className="navbar-menu">
            {isAuthenticated ? (
              <>
                <Link to="/" className="navbar-link">
                  <FaHome />
                  <span>Home</span>
                </Link>
                
                <div className="navbar-user">
                  <div className="user-avatar">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt={user.name} />
                    ) : (
                      <span>{getInitials(user?.name || 'U')}</span>
                    )}
                  </div>
                  
                  <div className="user-dropdown">
                    <button 
                      className="user-button"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <span>{user?.name}</span>
                      <FaUserCircle />
                    </button>
                    
                    {isMenuOpen && (
                      <div className="dropdown-menu">
                        <Link 
                          to="/profile" 
                          className="dropdown-item"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FaUser />
                          <span>My Profile</span>
                        </Link>
                        <button 
                          className="dropdown-item logout-btn"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="btn btn-secondary">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 