import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import API_BASE_URL from '../config/api';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/posts?page=${page}&limit=10`);
      const { posts: newPosts, totalPages } = response.data;
      
      if (page === 1) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }
      
      setHasMore(page < totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (content) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, { content });
      setPosts(prev => [response.data, ...prev]);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/posts/${postId}/like`);
      setPosts(prev => 
        prev.map(post => 
          post._id === postId ? response.data : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post');
    }
  };

  const handleCommentPost = async (postId, content) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comment`, { content });
      setPosts(prev => 
        prev.map(post => 
          post._id === postId ? response.data : post
        )
      );
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error commenting on post:', error);
      toast.error('Failed to add comment');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      setPosts(prev => prev.filter(post => post._id !== postId));
      toast.success('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="container">
      <div className="home-content">
        {isAuthenticated && (
          <div className="create-post-section">
            <CreatePost onCreatePost={handleCreatePost} />
          </div>
        )}

        <div className="posts-section">
          {posts.length === 0 && !loading ? (
            <div className="empty-state">
              <h3>No posts yet</h3>
              <p>Be the first to share something with the community!</p>
            </div>
          ) : (
            <>
              {posts.map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  currentUser={user}
                  onLike={handleLikePost}
                  onComment={handleCommentPost}
                  onDelete={handleDeletePost}
                />
              ))}
              
              {hasMore && (
                <div className="load-more">
                  <button 
                    className="btn btn-secondary"
                    onClick={loadMorePosts}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More Posts'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 