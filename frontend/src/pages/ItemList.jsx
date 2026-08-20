import { useEffect, useState } from 'react';
import api from '../api/axios';

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function CommentSection({ itemId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/items/${itemId}/comments`);
      setComments(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    if (open) fetchComments();
  }, [open]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await api.post(`/items/${itemId}/comments`, { text });
      setText('');
      fetchComments();
    } catch (err) {
      alert('Failed to send message.');
    }
  };

  return (
    <div className="comment-section">
      <p className="link" onClick={() => setOpen(!open)}>
        {open ? 'Hide messages' : 'Contact poster / view messages'}
      </p>
      {open && (
        <div className="comment-box">
          {comments.length === 0 && <p className="meta">No messages yet. Be the first to reach out.</p>}
          {comments.map((c) => (
            <div key={c.id} className="comment">
              <span className="comment-author">{c.commentedBy ? c.commentedBy.name : 'Unknown'}:</span> {c.text}
            </div>
          ))}
          <form onSubmit={handleSend} className="comment-form">
            <input
              placeholder="e.g. Is this mine? I can describe it..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

function ItemList({ refreshTrigger }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (err) {
      setError('Failed to load items.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.delete(`/items/${id}`);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete item.');
    }
  };

  const handleResolve = async (id) => {
    try {
      await api.patch(`/items/${id}/resolve`);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to mark as resolved.');
    }
  };

  const visibleItems = items
    .filter((i) => filter === 'ALL' || i.status === filter)
    .filter((i) => {
      const term = search.toLowerCase();
      return (
        i.title.toLowerCase().includes(term) ||
        i.location.toLowerCase().includes(term) ||
        i.category.toLowerCase().includes(term)
      );
    });

  return (
    <div className="card">
      <div className="list-header">
        <h2>Lost & Found Board</h2>
        <div className="filters">
          {['ALL', 'LOST', 'FOUND', 'RESOLVED'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <input
        className="search-input"
        placeholder="Search by title, category, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p className="error">{error}</p>}
      {visibleItems.length === 0 && !error && <p className="meta">No items to show.</p>}

      {visibleItems.map((item) => (
        <div
          key={item.id}
          className={`item-card ${item.status === 'FOUND' ? 'found' : item.status === 'RESOLVED' ? 'resolved' : 'lost'}`}
        >
          <div className="item-header">
            <h3>{item.title}</h3>
            <span
              className={`status-badge ${
                item.status === 'FOUND' ? 'badge-found' : item.status === 'RESOLVED' ? 'badge-resolved' : 'badge-lost'
              }`}
            >
              {item.status}
            </span>
          </div>
          <p>{item.description}</p>
          <p className="meta">{item.category} &middot; {item.location}</p>
          <p className="meta">Posted by: {item.postedBy ? item.postedBy.name : 'Unknown'} &middot; {timeAgo(item.createdAt)}</p>

          <CommentSection itemId={item.id} />

          <div className="card-actions">
            {item.status !== 'RESOLVED' && (
              <button className="resolve-btn" onClick={() => handleResolve(item.id)}>Mark Resolved</button>
            )}
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;