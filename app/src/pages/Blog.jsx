import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPost, setEditPost] = useState({
    name: '',
    content: ''
  });
  const [newPost, setNewPost] = useState({
    name: '',
    content: ''
    });
  
  // Fetch posts using the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
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

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/blog/${editPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editPost.name,
          content: editPost.content
        })
      });

      if (!response.ok) throw new Error('Failed to update post');
      
      // Update local state
      setPosts(posts.map(post => 
        post.id === editPost.id ? editPost : post
      ));
      
      // Close modal and reset edit state
      setIsEditModalOpen(false);
      setEditPost({ name: '', content: '' });
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  const editModal = () => {
    return (
      <div className="edit-modal">
        <h2>Edit Post</h2>
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={editPost.name}
            onChange={(e) => setEditPost({...editPost, name: e.target.value})}
            placeholder="Your Name"
            required
          />
          <textarea
            value={editPost.content}
            onChange={(e) => setEditPost({...editPost, content: e.target.value})}
            placeholder="Editing post content..."
            required
          />
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditPost({ name: '', content: '' });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="blog-container">
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
          <button className="add-post-btn" type="submit">Add Post</button>
        </form>
      </div>

      <div className="posts">
      {isEditModalOpen && editModal()}
        {!isEditModalOpen && posts.length > 0 ? (
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
                <button 
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setEditPost(post);
                  }} 
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(post.id)} 
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : ( !isEditModalOpen &&
          <p>No posts yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
}

export default Blog;