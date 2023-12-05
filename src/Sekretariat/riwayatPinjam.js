import React, { useState, useEffect } from "react";
import { Table, Card } from "react-bootstrap";
import { useUserRole } from "../userRole";
import * as api from "../utils/constants";
import Container from "react-bootstrap/Container";
import NavbarComp from "../Component/Navbar";

function RiwayatPeminjaman() {
  const { userRole } = useUserRole();
  const [riwayatPeminjaman, setRiwayatPeminjaman] = useState([]);

  useEffect(() => {
    // Ambil data riwayat peminjaman yang telah selesai
    api
      .RiwayatPeminjaman()
      .then((riwayatData) => {
        setRiwayatPeminjaman(riwayatData);
        console.log(riwayatData);
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

      <Container style={{ marginTop: "15vh" }}>
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
              {riwayatPeminjaman && riwayatPeminjaman.length > 0 ? (
                riwayatPeminjaman.map((riwayat, index) => (
                  <tr
                    key={riwayat.id}
                  >
                    <td style={{
                      background:
                        riwayat.status_peminjaman === '1'
                          ? "lightgreen"
                          : riwayat.status_peminjaman === '-1'
                          ? "red"
                          : "transparent",
                    }}>{index + 1}</td>
                    <td style={{
                      background:
                        riwayat.status_peminjaman === '1'
                          ? "lightgreen"
                          : riwayat.status_peminjaman === '-1'
                          ? "red"
                          : "transparent",
                    }}>{riwayat.id_ruangan}</td>
                    <td style={{
                      background:
                        riwayat.status_peminjaman === '1'
                          ? "lightgreen"
                          : riwayat.status_peminjaman === '-1'
                          ? "red"
                          : "transparent",
                    }}>{riwayat.tanggal}</td>
                    <td style={{
                      background:
                        riwayat.status_peminjaman === '1'
                          ? "lightgreen"
                          : riwayat.status_peminjaman === '-1'
                          ? "red"
                          : "transparent",
                    }}>{riwayat.jam_peminjaman}</td>
                    <td style={{
                      background:
                        riwayat.status_peminjaman === '1'
                          ? "lightgreen"
                          : riwayat.status_peminjaman === '-1'
                          ? "red"
                          : "transparent",
                    }}>{riwayat.jam_selesai_peminjaman}</td>
                    <td style={{
                      background:
                        riwayat.status_peminjaman === '1'
                          ? "lightgreen"
                          : riwayat.status_peminjaman === '-1'
                          ? "red"
                          : "transparent",
                    }}>{riwayat.updatedAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Tidak ada riwayat peminjaman.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}

export default RiwayatPeminjaman;
