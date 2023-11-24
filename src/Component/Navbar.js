import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { useUserRole } from "../userRole";

const NavbarComp = () => {
  const { userRole } = useUserRole();
  return (
    <div>
      <Navbar fixed="top" expand="lg" className="navBar fw-semi" variant="light">
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
              <span style={{ marginLeft:'2vh' }}>Universitas <br/>Sanata Dharma</span>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {/* <Nav.Link href="#link">Ruangan</Nav.Link> */}
              {userRole === "peminjam" && <Nav.Link href="">Ruangan</Nav.Link>}
              {userRole === "sekretariat" && (
                <Nav.Link href="/daftar-pinjam">Permintaan Peminjaman</Nav.Link>
              )}
              {userRole === "sekretariat" && (
                <Nav.Link href="/riwayat-pinjam">Riwayat Peminjaman</Nav.Link>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
