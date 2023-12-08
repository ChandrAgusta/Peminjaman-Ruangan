import React, { createContext, useContext, useState } from "react";

const storedUserData = localStorage.getItem("user");
const user = JSON.parse(storedUserData);
const initialUserRole = user ? user.role : 'defaultRole'; // Set a default role if user data is not available

export const UserRoleContext = createContext();

export function UserRoleProvider({ children }) {
  const [userRole, setUserRole] = useState(initialUserRole);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserRoleContext);
}