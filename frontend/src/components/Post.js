import React, { useState } from 'react';
import { API } from '../api';

function Post({ post, user, refreshPosts }) {
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  const handleLike = async () => {
    if (!user) return alert("Login first");
    try {
      const res = await API.put(`/posts/${post._id}/like`, { userId: user._id });
      setLikes(res.data.likes); // update UI immediately
    } catch (err) {
      console.error("Like error:", err.response || err.message);
    }
  };

  const handleComment = async () => {
    if (!user) return alert("Login first");
    if (!comment.trim()) return;

    try {
      const res = await API.post(`/posts/${post._id}/comment`, { userId: user._id, comment });
      setComments(res.data.comments); // update UI immediately
      setComment('');
    } catch (err) {
      console.error("Comment error:", err.response || err.message);
    }
  };

  return (
    <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
      <p><b>{post.userId?.username || "Unknown"}:</b> {post.content}</p>
      <p>
        Likes: {likes.length} 
        <button onClick={handleLike}>Like/Unlike</button>
      </p>

      <div>
        <input 
          type="text" 
          value={comment} 
          placeholder="Comment..." 
          onChange={e => setComment(e.target.value)} 
        />
        <button onClick={handleComment}>Comment</button>
      </div>

      <div>
        {comments.map((c, i) => (
          <p key={i}><b>{c.userId?.username || "Unknown"}:</b> {c.text}</p>
        ))}
      </div>
    </div>
  );
}

export default Post;
