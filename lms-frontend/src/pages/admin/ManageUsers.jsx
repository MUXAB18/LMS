import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/users');
      setUsers(data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"?`)) return;
    try {
      await API.delete(`/users/${id}`);
      toast.success('User deleted');
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const roleColors = { admin: '#4F46E5', instructor: '#10B981', student: '#06B6D4' };

  if (loading) return <Loader text="Loading users..." />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">👥 Manage Users</h1>
          <p className="dashboard-subtitle">{users.length} total users registered</p>
        </div>
      </div>
      <div className="container py-4">
        <div className="mb-4">
          <input
            className="form-control search-input-plain"
            placeholder="🔍  Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table lms-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="user-avatar-sm">{u.name.charAt(0).toUpperCase()}</div>
                      {u.name}
                      {u._id === currentUser._id && <span className="badge bg-secondary ms-1">You</span>}
                    </div>
                  </td>
                  <td className="text-muted">{u.email}</td>
                  <td>
                    <span className="role-badge" style={{ background: roleColors[u.role] + '22', color: roleColors[u.role] }}>
                      {u.role}
                    </span>
                  </td>
                  <td className="text-muted small">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    {u._id !== currentUser._id ? (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u._id, u.name)}>
                        <i className="bi bi-trash me-1"></i>Delete
                      </button>
                    ) : (
                      <span className="text-muted small">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="5" className="text-center text-muted py-4">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
