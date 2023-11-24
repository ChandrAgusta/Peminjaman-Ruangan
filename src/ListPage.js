import React, { useState, useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useUserRole } from "./userRole";
import * as api from "./utils/constants";
import Swal from "sweetalert2";

function ListPage() {
  const { userRole } = useUserRole();
  const [ruangan, setRuangan] = useState([]);

  useEffect(() => {
    api
      .getRuanganData()
      .then((ruanganData) => {
        setRuangan(ruanganData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .deleteRuanganData(id)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Terhapus!',
              text: 'Data ruangan telah dihapus.',
              showConfirmButton:false,
              timer:1000
            });
            // Refresh daftar ruangan setelah penghapusan
            const updatedRuangan = ruangan.filter((ruang) => ruang.id !== id);
            setRuangan(updatedRuangan);
          })
          .catch((error) => {
            console.error('Gagal menghapus data:', error);
            Swal.fire({
              icon: 'error',
              title: 'Gagal!',
              text: 'Terjadi kesalahan saat menghapus data ruangan.',
              showConfirmButton:false,
              timer:1000
            });
          });
      }
    });
  };

  return (
    <div className="container">
      <h2>Daftar Ruangan</h2>
      <Card>
        <Table responsive className="mt-3">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Ruangan</th>
              <th>Kapasitas</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {ruangan.map((ruang, index) => (
              <tr key={ruang.id}>
                <td>{index + 1}</td>
                <td>{ruang.nama_ruangan}</td>
                <td>{ruang.kapasitas}</td>
                <td>{ruang.desc}</td>
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
                      <Link
                        to={{
                          pathname: `/FormEdit/${ruang.id}`,
                          state: { ruangan: ruang },
                        }}
                      >
                        <Button className="tombolEdit mx-2 btn-warning">Edit</Button>
                      </Link>
                      <Button
                        className="buttonHapus btn-danger"
                        onClick={() => handleDelete(ruang.id)}
                      >
                        Hapus
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default ListPage;

// import React, { useState, useEffect } from 'react';
// import { Table, Button, Card } from 'react-bootstrap';
// import { Link, useLocation } from 'react-router-dom';
// import { useUserRole } from './userRole';
// import * as api from './utils/constants';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function ListPage() {
//   const { userRole } = useUserRole();
//   const [ruangan, setRuangan] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     api.getRuanganData(selectedDate) // Kirim tanggal yang dipilih ke fungsi API
//       .then((ruanganData) => {
//         setRuangan(ruanganData);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [selectedDate]); // Jalankan useEffect ketika selectedDate berubah

//   const handleDelete = (id) => {
//     api.deleteRuanganData(id)
//       .then(() => {
//         const updatedRuangan = ruangan.filter((ruang) => ruang.id !== id);
//         setRuangan(updatedRuangan);
//       })
//       .catch((error) => {
//         console.error('Gagal menghapus data:', error);
//       });
//   };

//   return (
//     <div className="container">
//       <h2>Daftar Ruangan</h2>
//       <div className="mb-3">
//         <label>Pilih Tanggal: </label>
//         <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
//       </div>
//       <Card>
//         <Table responsive className="mt-3">
//           {/* Tampilan tabel */}
//         </Table>
//       </Card>
//     </div>
//   );
// }

// export default ListPage;
