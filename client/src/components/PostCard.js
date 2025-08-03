import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart, FaComment, FaTrash, FaEdit } from 'react-icons/fa';

const PostCard = ({ post, currentUser, onLike, onComment, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isLiked = post.likes?.some(like => like._id === currentUser?._id);
  const isAuthor = post.author._id === currentUser?._id;

  const handleLike = () => {
    if (!currentUser) return;
    onLike(post._id);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim() || !currentUser) return;

    setIsSubmittingComment(true);
    try {
      await onComment(post._id, commentContent.trim());
      setCommentContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post._id);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">
          {post.author.profilePicture ? (
            <img src={post.author.profilePicture} alt={post.author.name} />
          ) : (
            <span>{getInitials(post.author.name)}</span>
          )}
        </div>
        <div className="post-author">
          <Link to={`/user/${post.author._id}`} className="post-author-name">
            {post.author.name}
          </Link>
          <div className="post-time">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </div>
        </div>
        {isAuthor && (
          <button
            className="post-delete-btn"
            onClick={handleDelete}
            title="Delete post"
          >
            <FaTrash />
          </button>
        )}
      </div>

      <div className="post-content">
        {post.content}
      </div>

      <div className="post-actions">
        <button
          className={`post-action ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={!currentUser}
        >
          <FaHeart />
          <span>{post.likes?.length || 0}</span>
        </button>

        <button
          className="post-action"
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          {currentUser && (
            <form onSubmit={handleComment} className="comment-form">
              <div className="comment-input-group">
                <div className="comment-avatar">
                  {currentUser.profilePicture ? (
                    <img src={currentUser.profilePicture} alt={currentUser.name} />
                  ) : (
                    <span>{getInitials(currentUser.name)}</span>
                  )}
                </div>
                <div className="comment-input-wrapper">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="comment-input"
                    disabled={isSubmittingComment}
                  />
                  <button
                    type="submit"
                    className="comment-submit-btn"
                    disabled={!commentContent.trim() || isSubmittingComment}
                  >
                    {isSubmittingComment ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="comments-list">
            {post.comments?.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-avatar">
                  {comment.user.profilePicture ? (
                    <img src={comment.user.profilePicture} alt={comment.user.name} />
                  ) : (
                    <span>{getInitials(comment.user.name)}</span>
                  )}
                </div>
                <div className="comment-content">
                  <div className="comment-author">
                    <Link to={`/user/${comment.user._id}`}>
                      {comment.user.name}
                    </Link>
                  </div>
                  <div className="comment-text">{comment.content}</div>
                  <div className="comment-time">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard; 