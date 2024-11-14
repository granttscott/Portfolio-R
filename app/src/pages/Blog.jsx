import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    name: '',
    content: ''
    });
  
  // Fetch posts using the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost)
      });

      if (!response.ok) throw new Error('Failed to create post');
      
      // Reset form
      setNewPost({ name: '', content: '' });
      
      // Refresh posts
      const refreshResponse = await fetch('/api/blog');
      if (!refreshResponse.ok) throw new Error('Failed to fetch posts');
      const postsData = await refreshResponse.json();
      setPosts(postsData);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  // Handle post deletion
  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete post');
      
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="blog-container">
      <button className="back" onClick={() => navigate(-1)}>Back</button>
      <Link to="/">
        <button className="home">Home</button>
      </Link>
      <h1>Blog</h1>
      
      <div className="new-post">
        <h2>Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newPost.name}
            onChange={(e) => setNewPost({...newPost, name: e.target.value})}
            placeholder="Your Name"
            required
          />
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            placeholder="Write your post here..."
            required
          />
          <button type="submit">Add Post</button>
        </form>
      </div>

      <div className="posts">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="post">
              <h3>{post.name}</h3>
              <p>{post.content}</p>
              <small>
                Posted on: {post.date ? 
                  new Date(post.date._seconds * 1000).toLocaleString('en-US', { 
                    timeZone: 'America/Los_Angeles' 
                  }) : 'Unknown'}
              </small>
              <div className="post-actions">
                <Link to={`/edit-post/${post.id}`} className="edit-btn">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(post.id)} 
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
}

export default Blog;