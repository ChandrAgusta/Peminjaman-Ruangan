import React from 'react';
import NavbarComp from './Component/Navbar';
import Modals from './Component/modal';
import ListPage from './ListPage';

const Layout = ({ children }) => {
  return (
    <div className="App">
      <NavbarComp />
      {children}
    </div>
  );
};

export default Layout;