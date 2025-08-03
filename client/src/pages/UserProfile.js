import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import API_BASE_URL from '../config/api';

const UserProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [userResponse, postsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/users/${id}`),
        axios.get(`${API_BASE_URL}/users/${id}/posts`)
      ]);
      
      setUser(userResponse.data);
      setPosts(postsResponse.data.posts);
      
      // Check if current user is following this user
      if (currentUser) {
        setIsFollowing(currentUser.following?.includes(id));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!currentUser) {
      toast.error('Please login to follow users');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}/follow`);
      setIsFollowing(response.data.following);
      toast.success(response.data.message);
      
      // Update user data to reflect new follower count
      const userResponse = await axios.get(`${API_BASE_URL}/users/${id}`);
      setUser(userResponse.data);
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('Failed to follow user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <div className="error-message">
          User not found
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?._id === user._id;

  return (
    <div className="container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} />
            ) : (
              <span>{getInitials(user.name)}</span>
            )}
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-bio">{user.bio || 'No bio yet'}</p>
            
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-number">{user.followers?.length || 0}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{user.following?.length || 0}</div>
                <div className="stat-label">Following</div>
              </div>
            </div>

            {!isOwnProfile && currentUser && (
              <button
                className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
                onClick={handleFollow}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Processing...'
                ) : isFollowing ? (
                  <>
                    <FaUserCheck />
                    Following
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    Follow
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="profile-posts">
          <h2>{user.name}'s Posts</h2>
          <div className="posts-list">
            {posts.length === 0 ? (
              <div className="empty-state">
                <h3>No posts yet</h3>
                <p>{user.name} hasn't shared anything yet.</p>
              </div>
            ) : (
              posts.map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  currentUser={currentUser}
                  onLike={() => {}} // Handle like if needed
                  onComment={() => {}} // Handle comment if needed
                  onDelete={() => {}} // Handle delete if needed
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 