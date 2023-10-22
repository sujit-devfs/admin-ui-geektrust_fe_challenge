import React, { useState } from "react";
import "./UserTable.css";

function UserTable({
  users,
  selectedUsers,
  onToggleUserSelection,
  onEditUser,
  onDeleteUser
}) {
  const [editedUserId, setEditedUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const handleEditClick = (userId, name) => {
    setEditedUserId(userId);
    setEditedName(name);
  };

  const handleSaveClick = (user) => {
    setEditedUserId(null);
    onEditUser(user);
  };

  const handleDeleteClick = (userId) => {
    onDeleteUser(userId);
  };

  const handleSelectAllClick = () => {
    // console.log("handleSelectAllClick called");
    const currentPageUserIds = users.map((user) => user.id);
    // console.log(currentPageUserIds)
    setSelectAll(!selectAll);
    onToggleUserSelection(!selectAll ? currentPageUserIds : []);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllClick}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className={selectedUsers.includes(user.id) ? "selected" : ""}
            onClick={() => onToggleUserSelection(user.id)}
          >
            <td>
              <input
                type="checkbox"
                id={user.id}
                checked={selectedUsers.includes(user.id)}
                onChange={() => onToggleUserSelection(user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>
              {editedUserId === user.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                user.name
              )}
            </td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              {editedUserId === user.id ? (
                <div>
                  <button onClick={() => handleSaveClick(user)}>Save</button>
                </div>
              ) : (
                <div>
                  <button onClick={() => handleEditClick(user.id, user.name)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(user.id)}>
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
