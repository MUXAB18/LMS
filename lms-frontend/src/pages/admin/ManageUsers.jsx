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

  const handleStatusUpdate = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await API.patch(`/users/${id}/status`, { isApproved: newStatus });
      toast.success(newStatus ? 'User Approved' : 'User Status Updated');
      setUsers(users.map(u => u._id === id ? { ...u, isApproved: newStatus } : u));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
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
              <tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="user-avatar-sm">{u.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className="fw-medium">{u.name}</div>
                        <div className="text-muted small">{new Date(u.createdAt).toLocaleDateString()}</div>
                      </div>
                      {u._id === currentUser._id && <span className="badge bg-secondary ms-1">You</span>}
                    </div>
                  </td>
                  <td className="text-muted">{u.email}</td>
                  <td>
                    <span className="role-badge" style={{ background: roleColors[u.role] + '22', color: roleColors[u.role] }}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    {u.role === 'admin' ? (
                      <span className="badge bg-success bg-opacity-10 text-success p-2 rounded-3 border border-success border-opacity-25">Verified Admin</span>
                    ) : u.isApproved ? (
                      <span className="badge bg-info bg-opacity-10 text-info p-2 rounded-3 border border-info border-opacity-25">Approved</span>
                    ) : (
                      <span className="badge bg-warning bg-opacity-10 text-warning p-2 rounded-3 border border-warning border-opacity-25">Pending Approval</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      {u.role === 'instructor' && !u.isApproved && (
                        <button className="btn btn-sm btn-success" onClick={() => handleStatusUpdate(u._id, u.isApproved)}>
                          <i className="bi bi-check-circle me-1"></i>Approve
                        </button>
                      )}
                      {u._id !== currentUser._id ? (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u._id, u.name)}>
                          <i className="bi bi-trash me-1"></i>Delete
                        </button>
                      ) : (
                        <span className="text-muted small">—</span>
                      )}
                    </div>
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
