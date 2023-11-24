import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useUserRole } from '../userRole';
import * as api from '../utils/constants';
import Container from 'react-bootstrap/Container';
import NavbarComp from '../Component/Navbar';
import Swal from 'sweetalert2';

function DaftarPinjam() {
  const { userRole } = useUserRole();
  const [peminjamanData, setPeminjaman] = useState([]);

  useEffect(() => {
    api.getPeminjamanData()
      .then((peminjamanData) => {
        setPeminjaman(peminjamanData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTerima = async(idPeminjaman) =>{
    try {
      const updatedPeminjamanData = {
        status_peminjaman: 1, 
        // Tambahkan data lain yang diperlukan jika ada
      };
      await api.putPeminjamanData(idPeminjaman, updatedPeminjamanData);
      Swal.fire({
        icon:'success',
        title:'Permintaan Peminjaman Berhasil',
        text:'Permohonan Peminjaman Ruangan Berhasil Dikonfirmasi',
        timer:1500,
        showConfirmButton:false,
      })
    } catch (error) {
      console.error('Gagal memperbarui status peminjaman:', error);
    }
  };

  return (
    <div className="container">
      <Container>
          <NavbarComp />
      </Container>
      
      <Container style ={{ marginTop: '15vh' }}>
        <h2>Daftar Permintaan</h2>
        <Card>
          <Table responsive className="mt-3">
            <thead>
              <tr>
                <th>No</th>
                <th>Id Ruangan</th>
                {/* <th>Nama Ruangan</th> */}
                <th>Tanggal Peminjaman</th>
                <th>Jam Masuk</th>
                <th>Jam Keluar</th>
                <th>Jam Permintaan Masuk</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {peminjamanData.map((ruang, index) => (
                <tr key={ruang.id}>
                  <td>{index + 1}</td>
                  <td>{ruang.id_ruangan}</td>
                  <td>{ruang.tanggal}</td>
                  <td>{ruang.jam_peminjaman}</td>
                  <td>{ruang.jam_selesai_peminjaman}</td>
                  <td>{ruang.createdAt}</td>
                  <td>
                    {userRole === 'peminjam' && (
                      <Link
                        to={{
                          pathname: `/FormPinjam/${ruang.id}`,
                          state: { ruangan: ruang },
                        }}
                      >
                        <Button className="tombolPinjam">Pinjam</Button>
                      </Link>
                    )}
                    {userRole === 'sekretariat' && (
                      <>
                        <Button className="mx-2 btn-warning" onClick={()=> handleTerima(ruang.id)}>Terima</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}

export default DaftarPinjam;
