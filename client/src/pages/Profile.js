import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio cannot be more than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateProfile({
        name: formData.name.trim(),
        bio: formData.bio.trim()
      });
      if (result.success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} />
            ) : (
              <span>{getInitials(user?.name || 'U')}</span>
            )}
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-edit-form">
              <div className="form-group">
                <label className="form-label">
                  <FaUser />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className={`form-input ${errors.bio ? 'error' : ''}`}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  maxLength={500}
                  disabled={isSubmitting}
                />
                <div className="char-count">
                  {formData.bio.length}/500
                </div>
                {errors.bio && (
                  <div className="error-message">{errors.bio}</div>
                )}
              </div>

              <div className="profile-edit-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  <FaSave />
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <h1 className="profile-name">{user?.name}</h1>
              <p className="profile-bio">{user?.bio || 'No bio yet'}</p>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <div className="stat-number">{user?.followers?.length || 0}</div>
                  <div className="stat-label">Followers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{user?.following?.length || 0}</div>
                  <div className="stat-label">Following</div>
                </div>
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit />
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="profile-posts">
          <h2>My Posts</h2>
          <div className="posts-list">
            {/* Posts will be loaded here */}
            <div className="empty-state">
              <h3>No posts yet</h3>
              <p>Start sharing your thoughts with the community!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 