import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import React from "react";
import * as api from "../utils/constants";
import { useUserRole } from "../userRole";

const NavbarComp = () => {
  const { userRole } = useUserRole();

  const handleLogout = async () =>{

    try {
      // Ambil token dari local storage
    const token = localStorage.getItem('token');

    // Periksa apakah token ada sebelum digunakan dalam permintaan
    if (!token) {
      console.error('Token tidak ditemukan');
      return;
    }
      // Buat objek headers sesuai kebutuhan (Contoh: menambahkan token untuk autentikasi)
      const headers = {
        'Content-Type': 'application/json', // Tipe konten yang dikirim
        'Authorization': `Bearer ${token}`, // Token autentikasi (misalnya JWT)
      };
  
      const response = await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        headers: headers,
      });
      if (response) {
        // Lakukan logika logout di sini
        // Misalnya:
        localStorage.removeItem("token"); // Hapus token dari local storage
        localStorage.removeItem("user"); // Hapus token dari local storage
        window.location.href = "/"; // Redirect ke halaman login setelah logout berhasil
      } else {
        console.error("Gagal melakukan logout");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div>
      <Navbar
        fixed="top"
        expand="lg"
        className="navBar fw-semi"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="#home">
            <span className="container d-flex align-items-center">
              <img
                alt=""
                src="../logo192.png"
                width="50"
                height="50"
                className="d-inline-block align-top"
              />
              <span style={{ marginLeft: "2vh" }}>
                Universitas <br />
                Sanata Dharma
              </span>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
              {/* <Nav.Link href="#link">Ruangan</Nav.Link> */}
              {userRole === "peminjam" && (
                <Nav.Link href="/pinjam-ruangan">Pinjam Ruangan</Nav.Link>
              )}
              {userRole === "sekretariat" && (
                <Nav.Link href="/daftar-pinjam">Permintaan Peminjaman</Nav.Link>
              )}
              {userRole === "sekretariat" && (
                <Nav.Link href="/riwayat-pinjam">Riwayat Peminjaman</Nav.Link>
              )}
            </Nav>
            <Nav>
              <Nav.Item>
                {/* <Nav.Link href="/"> */}
                  <Button onClick={handleLogout} className="btn-danger">Logout</Button>
                {/* </Nav.Link> */}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
