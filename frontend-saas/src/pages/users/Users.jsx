import { useEffect, useState } from "react";
import { getUsers } from "../../services/FakeStoreServices";
import "./UsersStyles.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("user");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Error fetching users.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setSelectedRole(user.role || "user");
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSaveRole = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: selectedRole } : u))
    );
    setEditingUserId(null);
    // backend update isteği eklenebilir
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    setUsers((prev) => prev.filter((u) => u.id !== userId));
    // backend delete isteği eklenebilir
  };

  // Filtreleme ve arama
  const filteredUsers = users.filter(
    (user) =>
      (roleFilter === "all" || user.role === roleFilter) &&
      (user.name.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container-user">
      <div className="users-wrapper">
        <h2>Users</h2>

        <div className="controls">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="role-filter"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.name.firstname} {user.name.lastname}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role || "user"}</td>
                  <td>
                    {editingUserId === user.id ? (
                      <>
                        <select
                          value={selectedRole}
                          onChange={handleRoleChange}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button onClick={() => handleSaveRole(user.id)}>
                          Save
                        </button>
                        <button onClick={() => setEditingUserId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleEditClick(user)}>
                        Edit
                      </button>
                    )}
                    <button onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={num === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
