import React, { useEffect, useState } from 'react';
import { API } from '../api';
import Post from '../components/Post';

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data.reverse());
    } catch (err) {
      console.error("Fetch posts error:", err.response || err.message);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const createPost = async () => {
    if (!user) return alert("Login first");
    if (!content.trim()) return alert("Enter message");

    try {
      await API.post('/posts', { userId: user._id, content });
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error("Create post error:", err.response || err.message);
      alert("Error posting message");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {user && (
        <div style={{ marginBottom: '20px' }}>
          <textarea 
            placeholder="What's on your mind?" 
            value={content} 
            onChange={e => setContent(e.target.value)}
            style={{ width: '100%', height: '60px', padding:'10px', fontSize:'16px' }}
          />
          <br />
          <button onClick={createPost} style={{ marginTop: '10px' }}>Post</button>
        </div>
      )}

      <h3>All Posts</h3>
      {posts.map(post => (
        <Post key={post._id} post={post} user={user} refreshPosts={fetchPosts} />
      ))}
    </div>
  );
}

export default Home;
