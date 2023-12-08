import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import NavbarComp from "../Component/Navbar";
import * as api from "../utils/constants";
import Swal from "sweetalert2";

const FormPinjam = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userNim, setUserNim] = useState('');
  const [dataPeminjam] = useState([])
  const [selectedDate, setSelectedDate] = useState("");
  const [ruanganTersedia, setRuanganTersedia] = useState([]);
  const [checkedJams, setCheckedJams] = useState({});
  const [jamMulai, setJamMulai] = useState({});
  const [jamSelesai, setJamSelesai] = useState({});

  useEffect(() => {
    api.getUserProfile2()
      .then((dataPeminjam) => {
        const { id, name, nim } = dataPeminjam.user;
        setUserId(id);
        setUserName(name);
        setUserNim(nim);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handlePinjam = async () => {
    if (selectedDate) {
      try {
        const ruanganData = await api.searchRuangan(selectedDate);
        setRuanganTersedia(ruanganData);
      } catch (error) {
        console.error("Error searching ruangan:", error);
      }
    } else {
      console.error("Please select a date");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ruanganData = await api.searchRuangan(selectedDate);
        setRuanganTersedia(ruanganData);
      } catch (error) {
        console.error("Error searching ruangan:", error);
      }
    };

    if (selectedDate) {
      fetchData();
    } else {
      console.error("Please select a date");
    }
  }, [selectedDate]);

  const handleCheckboxChange = (ruanganId, jam) => {
    if (!checkedJams[ruanganId]?.[jam]) {
      setJamMulai({
        ...jamMulai,
        [ruanganId]: {
          ...jamMulai[ruanganId],
          [jam]: jam,
        },
      });
    } else {
      setJamSelesai({
        ...jamSelesai,
        [ruanganId]: {
          ...jamSelesai[ruanganId],
          [jam]: jam,
        },
      });
    }

    setCheckedJams({
      ...checkedJams,
      [ruanganId]: {
        ...checkedJams[ruanganId],
        [jam]: !checkedJams[ruanganId]?.[jam],
      },
    });
  };

  const handlePeminjaman = async () => {
    const idRuanganTerpilih = []; // Array untuk menyimpan ID ruangan yang terpilih
    const jamMulaiArr = []; // Array untuk menyimpan jam mulai
    const jamSelesaiArr = []; // Array untuk menyimpan jam selesai

    if (Object.keys(checkedJams).length > 0) {
      Object.keys(checkedJams).forEach((ruanganId) => {
        Object.keys(checkedJams[ruanganId]).forEach((jam) => {
          if (checkedJams[ruanganId]?.[jam]) {
            idRuanganTerpilih.push(ruanganId);
            jamMulaiArr.push(jamMulai[ruanganId]?.[jam]);
            jamSelesaiArr.push(jamSelesai[ruanganId]?.[jam]);
          }
        });
      });
    }

    console.log(dataPeminjam);
    console.log("ID Ruangan yang terkirim:", idRuanganTerpilih); // Log ID ruangan yang terkirim
    console.log("Jam Mulai:", jamMulaiArr[0]); // Log jam mulai
    console.log("Jam Selesai:", jamMulaiArr[jamMulaiArr.length - 1]); // Log jam selesai

    const peminjamanData = {
      // id_peminjam: userId,
      tanggal: selectedDate,
      idRuangan: idRuanganTerpilih[0],
      jam_peminjaman: jamMulaiArr[0],
      jam_selesai_peminjaman: jamMulaiArr[jamMulaiArr.length - 1],
      ...checkedJams,
    };

    try {
      // Kirim data peminjaman ke backend
      await api.postPeminjamanData(idRuanganTerpilih[0], peminjamanData);
      Swal.fire({
        title: "Berhasil Mengajukan Peminjaman",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      // Proses berhasil, mungkin Anda ingin melakukan sesuatu di sini
    } catch (error) {
      Swal.fire({
        title: "Gagal Mengajukan Peminjaman",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
      console.error("Error creating peminjaman:", error);
    }
  };

  // console.log(dataPeminjam.user.name);

  return (
    <div>
      <form>
        <Container>
          <NavbarComp />
        </Container>
        <Container
          className="pinjamForm d-flex justify-content-center"
          style={{ marginTop: "13vh" }}
        >
          <Card className="w-75 p-4">
            <h2>Form Peminjaman Ruangan</h2>
            <Col className="p-3">
              <Row className="mb-4">
                <Col>
                <label>Nama </label>
                </Col>
                <Col>
                <input type ="text" value={userName} disabled>
                </input>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                <label>NIM </label>
                </Col>
                <Col>
                <input type ="text" value={userNim} disabled>
                </input>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <label>Tanggal Peminjaman</label>
                </Col>
                <Col>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </Col>
              </Row>
            </Col>

            {ruanganTersedia.length > 0 && (
              <Container className="mt-4">
                <h4>Ruangan Yang Tersedia pada Tanggal {selectedDate}:</h4>
                <label style={{ backgroundColor:'green' }}> </label>
                <table className="table" style={{ border: "2px solid black" }}>
                  <thead style={{ border: "2px solid black" }}>
                    <tr>
                      <th></th>
                      {ruanganTersedia.map((ruanganData) => (
                        <th
                          style={{ border: "2px solid black"}}
                          key={ruanganData.id}
                        >
                          {ruanganData.nama_ruangan}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ruanganTersedia[0].jam.map((jam, index) => (
                      <tr key={index}>
                        <td style={{ border: "2px solid black", width: "20%" }}>
                          {jam.jam} 
                        </td>

                        {ruanganTersedia.map((ruanganData) => (
                          <td
                            key={ruanganData.id}
                          >
                            <label for={`checkbox-${ruanganData.id}-${jam.jam}`}
                            style={{
                              display:"flex", 
                              height: '10vh',
                              backgroundColor:
                                ruanganData.jam.find(
                                  (item) => item.jam === jam.jam
                                ).status_ruangan === "0"
                                  ? "green"
                                  : "red",
                            }}
                            >
                            <input
                              type="checkbox"
                              // style={{ display:'none' }}
                              id={`checkbox-${ruanganData.id}-${jam.jam}`}
                              checked={checkedJams[ruanganData.id]?.[jam.jam]}
                              onChange={() =>
                                {
                                handleCheckboxChange(ruanganData.id, jam.jam)
                              }
                              }
                              disabled={
                                ruanganData.jam.find(
                                  (item) => item.jam === jam.jam
                                ).status_ruangan !== "0"
                              } // Checkbox akan dinonaktifkan jika status bukan 0
                            />
                            </label>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Container>
            )}
            <Container className="mt-4 d-flex justify-content-end">
              <Button onClick={handlePeminjaman}>Pinjam</Button>
            </Container>
          </Card>
        </Container>
      </form>
    </div>
  );
};

export default FormPinjam;
