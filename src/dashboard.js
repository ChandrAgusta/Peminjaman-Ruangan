import React from "react";
import Layout from "./layouts";
import { Container } from "react-bootstrap";
import ListPage from "./ListPage";
import FormPinjam from "./Peminjam/FormPinjam";
import LoginForm from "./login";

function Dashboard() {
  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('../bg.jpg')`,
    backgroundSize: 'cover',
    filter: 'blur(5px)',
  };

  const contentStyle = {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    zIndex: 1,
  };

  return (
      <div style={containerStyle}>
        <Layout />
      <div style={backgroundStyle}></div>
      <Container className="content mt-5" style={contentStyle}>
        <h2 style={{ fontWeight: 'bold' , color:'white'}}>Selamat Datang Di Sistem Peminjaman Ruangan Universitas Sanata Dharma Fakultas Sains dan Teknologi</h2>
      </Container>
    </div>
  );
}

export default Dashboard;
