import { useState } from 'react';
import api from '../api/axios';

function PostItem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('LOST');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/items', { title, description, category, location, status });
      setMessage('Item posted successfully!');
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
      setStatus('LOST');
    } catch (err) {
      setMessage('Failed to post item. Make sure all fields are filled and you are logged in.');
    }
  };

  return (
    <div>
      <h2>Post an Item</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} /><br />
        <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} /><br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </select><br />
        <button type="submit">Post Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PostItem;