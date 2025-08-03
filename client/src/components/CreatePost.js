import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';

const CreatePost = ({ onCreatePost }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreatePost(content.trim());
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
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

  return (
    <div className="create-post-card">
      <div className="create-post-header">
        <div className="create-post-avatar">
          {user?.profilePicture ? (
            <img src={user.profilePicture} alt={user.name} />
          ) : (
            <span>{getInitials(user?.name || 'U')}</span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="create-post-form">
          <textarea
            className="create-post-input"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
            rows={3}
            disabled={isSubmitting}
          />
          <div className="create-post-footer">
            <div className="char-count">
              {content.length}/1000
            </div>
            <button
              type="submit"
              className="btn btn-primary create-post-btn"
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? (
                'Posting...'
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost; 