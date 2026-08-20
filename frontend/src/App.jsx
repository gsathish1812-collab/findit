import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import PostItem from './pages/PostItem';
import ItemList from './pages/ItemList';
import Landing from './pages/Landing';
import api from './api/axios';
import './App.css';

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const navItems = [
    { key: 'overview', label: 'Overview', icon: '⊞' },
    { key: 'browse', label: 'Browse Items', icon: '☰' },
    { key: 'post', label: 'Post Item', icon: '＋' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">◆</span>
        <span className="brand-name">FindIt</span>
      </div>
      <p className="sidebar-menu-label">Menu</p>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`sidebar-link ${activeTab === item.key ? 'active' : ''}`}
            onClick={() => setActiveTab(item.key)}
          >
            <span className="sidebar-icon">{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
      <button className="sidebar-logout" onClick={onLogout}>Logout</button>
    </div>
  );
}

function Overview({ items }) {
  const lostCount = items.filter((i) => i.status === 'LOST').length;
  const foundCount = items.filter((i) => i.status === 'FOUND').length;
  const recentItems = [...items].slice(-5).reverse();

  return (
    <div>
      <h1 className="page-title">Overview</h1>
      <p className="page-subtitle">A quick look at what's happening on the board</p>
      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-label">Total Items</p>
          <p className="stat-value">{items.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Lost</p>
          <p className="stat-value stat-lost">{lostCount}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Found</p>
          <p className="stat-value stat-found">{foundCount}</p>
        </div>
      </div>

      <div className="card recent-card">
        <h2>Recent Activity</h2>
        {recentItems.length === 0 && <p className="meta">Nothing posted yet.</p>}
        {recentItems.map((item) => (
          <div key={item.id} className="recent-row">
            <span className={`status-badge ${item.status === 'FOUND' ? 'badge-found' : 'badge-lost'}`}>
              {item.status}
            </span>
            <span className="recent-title">{item.title}</span>
            <span className="meta">{item.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [items, setItems] = useState([]);

  const fetchItemsForStats = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchItemsForStats();
  }, [isLoggedIn, refreshTrigger]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setView('landing');
  };

  const handleItemPosted = () => {
    setRefreshTrigger((prev) => prev + 1);
    setActiveTab('browse');
  };

  if (!isLoggedIn) {
    if (view === 'landing') {
      return <Landing goToLogin={() => setView('login')} goToRegister={() => setView('register')} />;
    }
    return (
      <div className="app">
        <h1 className="app-title" onClick={() => setView('landing')}>FindIt</h1>
        {view === 'login' ? (
          <Login onLoginSuccess={handleLoginSuccess} goToRegister={() => setView('register')} />
        ) : (
          <Register goToLogin={() => setView('login')} />
        )}
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="dashboard-main">
        {activeTab === 'overview' && <Overview items={items} />}
        {activeTab === 'post' && (
          <div>
            <h1 className="page-title">Post an Item</h1>
            <p className="page-subtitle">Report something you lost or found</p>
            <PostItem onItemPosted={handleItemPosted} />
          </div>
        )}
        {activeTab === 'browse' && (
          <div>
            <h1 className="page-title">Browse Items</h1>
            <p className="page-subtitle">All lost and found reports on the board</p>
            <ItemList refreshTrigger={refreshTrigger} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;