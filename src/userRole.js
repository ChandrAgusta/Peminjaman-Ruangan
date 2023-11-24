import React, { createContext, useContext, useState } from 'react';

const UserRole = createContext();

export function UserRoleProvider({ children }) {
  const [userRole, setUserRole] = useState('sekretariat');

  return (
    <UserRole.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRole.Provider>
  );
}

export function useUserRole() {
  return useContext(UserRole);
}
