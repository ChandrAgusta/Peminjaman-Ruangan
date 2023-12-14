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
    fetchData(); // Memuat data saat komponen pertama kali dimuat
  }, []);
  const fetchData = () => {
    api.getPeminjamanData()
      .then((peminjamanData) => {
        setPeminjaman(peminjamanData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTerima = async (idPeminjaman, isAccepted) => {
    try {
      const updatedPeminjamanData = {
        status: isAccepted ? 1 : -1,
      };
  
      await api.putPeminjamanData(idPeminjaman, updatedPeminjamanData);
  
      fetchData();
      if (isAccepted) {
        Swal.fire({
          icon: 'success',
          title: 'Permintaan Peminjaman Berhasil',
          text: 'Permohonan Peminjaman Ruangan Berhasil Dikonfirmasi',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Permintaan Peminjaman Ditolak',
          text: 'Permohonan Peminjaman Ruangan Ditolak',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Gagal memperbarui status peminjaman:', error);
    }
  };
  

  return (
    <div className="container">
      <Container>
          <NavbarComp />
      </Container>
      
      <Container >
        <Card className='p-3' style ={{ marginTop: '18vh' }}>
        <h2>Daftar Permintaan</h2>
          <Table responsive className="mt-3">
            <thead>
              <tr>
                <th>No</th>
                <th>Id Ruangan</th>
                <th>Id Peminjam</th>
                <th>Tanggal Peminjaman</th>
                <th>Jam Masuk</th>
                <th>Jam Keluar</th>
                <th>Jam Permintaan Masuk</th>
                <th>Aksi</th>
                {/* <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {peminjamanData.map((ruang, index) => (
                <tr key={ruang.id}>
                  <td>{index + 1}</td>
                  <td>{ruang.id_ruangan}</td>
                  <td>{ruang.id_peminjam}</td>
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
                        <Button className="mx-2 btn-warning" onClick={()=> handleTerima(ruang.id, true)}>Terima</Button>
                        <Button className="mx-2 btn-danger" onClick={()=> handleTerima(ruang.id, false)}>Tolak</Button>
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
