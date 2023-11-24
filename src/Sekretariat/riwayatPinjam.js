import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useUserRole } from '../userRole';
import * as api from '../utils/constants';
import Container from 'react-bootstrap/Container';
import NavbarComp from '../Component/Navbar';

function RiwayatPeminjaman() {
  const { userRole } = useUserRole();
  const [riwayatPeminjaman, setRiwayatPeminjaman] = useState([]);

  useEffect(() => {
    // Ambil data riwayat peminjaman yang telah selesai
    api.getRiwayatPeminjaman()
      .then((riwayatData) => {
        setRiwayatPeminjaman(riwayatData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Container>
          <NavbarComp />
      </Container>
      
      <Container style ={{ marginTop: '15vh' }}>
        <h2>Riwayat Peminjaman</h2>
        <Card>
          <Table responsive className="mt-3">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Ruangan</th>
                <th>Tanggal Peminjaman</th>
                <th>Jam Masuk</th>
                <th>Jam Keluar</th>
                <th>Waktu Konfirmasi</th>
              </tr>
            </thead>
            <tbody>
              {riwayatPeminjaman.map((riwayat, index) => (
                <tr key={riwayat.id}>
                  <td>{index + 1}</td>
                  <td>{riwayat.id_ruangan}</td>
                  <td>{riwayat.tanggal}</td>
                  <td>{riwayat.jam_peminjaman}</td>
                  <td>{riwayat.jam_selesai_peminjaman}</td>
                  <td>{riwayat.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}

export default RiwayatPeminjaman;
