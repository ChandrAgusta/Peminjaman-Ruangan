import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
  const userRole = 'peminjam'; // Ganti nilai ini sesuai dengan role user yang sedang login
  // const userRole = 'sekretariat'; // Ganti nilai ini sesuai dengan role user yang sedang login
  // const userRole = 'admin'; // Ganti nilai ini sesuai dengan role user yang sedang login

  return (
    <UserRoleProvider>
      <Router>
        <Routes>
        <Route path="/login" element={<LoginForm/>} />
          {userRole === 'peminjam' && (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pinjam-ruangan" element={<PeminjamPage />} />
            </>
          )}
          {userRole === 'sekretariat' && (
            <>
              <Route path="/" element={<SekretariatPage />} />
              <Route path="/daftar-pinjam" element={<DaftarPinjam />} />
              <Route path="/riwayat-pinjam" element={<RiwayatPeminjaman />} />
            </>
          )}
          {userRole === 'admin' && (
            <>
              <Route path="/" element={<DashboardAdmin />} />
            </>
          )}
        </Routes>
      </Router>
    </UserRoleProvider>
  );
}