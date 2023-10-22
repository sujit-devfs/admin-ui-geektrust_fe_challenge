import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import Pagination from "./Pagination";

function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userToEdit, setUserToEdit] = useState({ id: null, name: "" });

  const itemsPerPage = 10;

  useEffect(() => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const toggleUserSelection = (userId) => {
    // console.log("toggleUserSelection called with userId:", userId);
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const deleteSelectedUsers = () => {
    const updatedUsers = users.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedUsers([]);
  };

  const handleEditUser = (editedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleSaveClick = (user) => {
    handleEditUser(user);
    setUserToEdit({ id: null, name: "" });
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>User Admin</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <UserTable
        users={displayedUsers}
        selectedUsers={selectedUsers}
        onToggleUserSelection={toggleUserSelection}
        onEditUser={handleEditUser}
        onDeleteUser={deleteSelectedUsers}
        userToEdit={userToEdit}
        setUserToEdit={setUserToEdit}
        handleSaveClick={handleSaveClick}
      />
      <div>
        <button
          onClick={() => deleteSelectedUsers()}
          style={{ padding: "10px" }}
        >
          Delete Selected
        </button>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default UserAdmin;
