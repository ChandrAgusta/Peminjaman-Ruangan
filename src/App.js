import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,UseHref, NavLink, Navigate
} from "react-router-dom";
import FormPinjam from "./Peminjam/FormPinjam";
import ListPage from "./ListPage";
import Layout from "./layouts";
import { Card, Container } from "react-bootstrap";
import SekretariatPage from "./Sekretariat/SekretariatPage";
import PeminjamPage from "./Peminjam/PeminjamPage";
import { UserRoleProvider } from "./userRole";
import EditForm from "./Sekretariat/editForm";
import DaftarPinjam from "./Sekretariat/daftarPinjam";
import RiwayatPeminjaman from "./Sekretariat/riwayatPinjam";
import Dashboard from "./dashboard";
import DashboardAdmin from "./admin/dashboard";
import LoginForm from "./login";

export default function App() {
  // const userRole = 'peminjam'; // Ganti nilai ini sesuai dengan role user yang sedang login
  // const userRole = 'sekretariat'; // Ganti nilai ini sesuai dengan role user yang sedang login
  // const userRole = 'admin'; // Ganti nilai ini sesuai dengan role user yang sedang login
  let userRole;
  try {
    let storedUserData = localStorage.getItem('user');
    let user = JSON.parse(storedUserData);
    userRole = user.role;    
  } catch (error) {
    userRole='';
  }

  console.log('User Role:', userRole);
  // const userRole = ""
  return (
    <UserRoleProvider>
      <Router>
        <Routes>
        <Route path="/" element={<LoginForm/>} />
          {userRole === 'peminjam' && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pinjam-ruangan" element={<PeminjamPage />} />
            </>
          )}
          {userRole === 'sekretariat' && (
            <>
              <Route path="/dashboard" element={<SekretariatPage />} />
              <Route path="/FormEdit/:id" element={< EditForm/>} />
              <Route path="/daftar-pinjam" element={<DaftarPinjam />} />
              <Route path="/riwayat-pinjam" element={<RiwayatPeminjaman />} />
            </>
          )}
          {userRole === 'admin' && (
            <>
              <Route path="/dashboard" element={<DashboardAdmin />} />
            </>
          )}
          <Route path="/*" element={<Navigate to ="/" replace/>} 
          />
        </Routes>
      </Router>
    </UserRoleProvider>
  );
}