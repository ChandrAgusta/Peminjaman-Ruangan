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

export default function App() {
  const userRole='sekretariat';

  return (
    <UserRoleProvider>
    <Router>
      <Routes>
        {userRole === 'peminjam' && <Route path="/" element={<PeminjamPage />} />}
        {userRole === 'sekretariat' && <Route path="/" element={<SekretariatPage />} />}
        {userRole === 'sekretariat' && <Route path="/daftar-pinjam" element={<DaftarPinjam />} />}
        {userRole === 'sekretariat' && <Route path="/daftar-pinjam/:id" element={<DaftarPinjam />} />}
        {userRole === 'sekretariat' && <Route path="/riwayat-pinjam/" element={< RiwayatPeminjaman/>} />}
        <Route path="/FormPinjam/:id" exact element={<FormPinjam />} />
        <Route path="/FormEdit/:id" element={<EditForm/>} />
      </Routes>
    </Router>
    </UserRoleProvider>
  );
}
