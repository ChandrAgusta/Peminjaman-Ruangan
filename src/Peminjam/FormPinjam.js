import React, { useState, useEffect } from "react";
import { Button, Col, Container, FormSelect, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { API_URL } from "../utils/constants";
import NavbarComp from "../Component/Navbar";
import {
  postPeminjamanData,
  getFasilitasData,
  getJamData,
} from "../utils/constants"; // Impor fungsi getRuanganData
import { useParams } from "react-router-dom"; // Gunakan useParams untuk mendapatkan ID ruangan
import Swal from "sweetalert2";

const FormPinjam = () => {
  const { id } = useParams(); // Dapatkan ID ruangan dari URL
  const [ruanganData, setRuanganData] = useState({});
  const [fasilitasData, setFasilitasData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [jamData, setJamData] = useState([]);
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");

  const [selectedFasilitas, setSelectedFasilitas] = useState([]); // State untuk menyimpan fasilitas yang dipilih

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Menambah atau menghapus fasilitas yang dipilih dari state
    if (checked) {
      setSelectedFasilitas([...selectedFasilitas, value]);
    } else {
      setSelectedFasilitas(
        selectedFasilitas.filter((fasilitas) => fasilitas !== value)
      );
    }
  };

  const handleJamSelesaiChange = (event) => {
    setJamSelesai(event.target.value);
  };

  const handleJamMulaiChange = (event) => {
    setJamMulai(event.target.value);
  };

  const handlePinjam = async () => {
    if (
      selectedDate &&
      jamMulai &&
      jamSelesai.length > 0
      // selectedFasilitas.length > 0
    ) {
      const peminjamanData = {
        idPeminjam: 1,
        ruanganId: id,
        tanggal: selectedDate,
        jam_peminjaman: jamMulai,
        jam_selesai_peminjaman: jamSelesai,
        barang: fasilitasData,
      };
      console.log("Data yang akan dikirim:", peminjamanData);
      try {
        await postPeminjamanData(id, peminjamanData);
        Swal.fire({
          icon: "success",
          title: "Peminjaman Berhasil",
          text: "Pengajuan Peminjaman Ruangan Berhasil, Tunggu Konfirmasi Sekretariat",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Peminjaman Gagal",
          text: "Terjadi Kesalahan Saat Memproses Peminjaman Ruangan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      console.error()
      Swal.fire({
        icon: "error",
        title: "Data Belum Lengkap",
        text: "Pastikan semua input terisi sebelum melakukan pengajuan.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };


  useEffect(() => {
    // Ambil data ruangan berdasarkan ID (misalnya, untuk menampilkan nama ruangan)
    axios
      .get(`${API_URL}/ruangan/${id}`)
      .then((res) => {
        setRuanganData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Panggil fungsi getFasilitasData untuk mengambil fasilitas berdasarkan ID ruangan
    getFasilitasData(id)
      .then((barang) => {
        setFasilitasData(barang);
      })
      .catch((error) => {
        console.error("Error fetching facility data:", error);
      });
  }, [id]);

  useEffect(() => {
    // Ambil data ruangan berdasarkan ID (misalnya, untuk menampilkan nama ruangan)
    axios
      .get(`${API_URL}/ruangan/${id}`)
      .then((res) => {
        setRuanganData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Panggil fungsi getFasilitasData untuk mengambil fasilitas berdasarkan ID ruangan
    getJamData(id)
      .then((jam) => {
        setJamData(jam);
        console.log('Jam:',jam)
      })
      .catch((error) => {
        console.error("Error fetching facility data:", error);
      });
  }, [id]);

  useEffect(() => {
    // Ambil data ruangan berdasarkan ID (misalnya, untuk menampilkan nama ruangan)
    axios
      .get(`${API_URL}/ruangan/${id}`)
      .then((res) => {
        setRuanganData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Panggil fungsi getFasilitasData untuk mengambil fasilitas berdasarkan ID ruangan
    getFasilitasData(id)
      .then((barang) => {
        setFasilitasData(barang);
        console.log('Barang:',barang)
      })
      .catch((error) => {
        console.error("Error fetching facility data:", error);
      });
  }, [id]);


  // useEffect(() => {
  //   // Panggil fungsi getFasilitasData saat komponen dimuat
  //   async function fetchFasilitasData() {
  //     if (ruanganData) {
  //       try {
  //         const data = await getFasilitasData(ruanganData.id); // Mengambil fasilitas berdasarkan ruangan yang dipilih
  //         setFasilitasData(data);
  //       } catch (error) {
  //         console.error("Error fetching data: ", error);
  //       }
  //     }
  //   }
  //   fetchFasilitasData();
  // }, [ruanganData]);

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
                  <label>Ruangan</label>
                </Col>
                <Col>
                  <input
                    type="text"
                    value={
                      ruanganData
                        ? ruanganData.id
                        : "Nama Ruangan Tidak Tersedia"
                    }
                    disabled
                  />
                </Col>
              </Row>
              {/* <Row className="mb-4">
                <Col>
                  <label>Nama Ruangan</label>
                </Col>
                <Col>
                  <input
                    type="text"
                    value={
                      ruanganData.nama_ruangan
                    }
                    disabled
                  />
                </Col>
              </Row> */}
              <Row className="mb-4">
                <Col>
                  <label>NIM</label>
                </Col>

                <Col>
                  <input type="text" value="1" disabled />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <label>Nama Peminjam</label>
                </Col>

                <Col>
                  <input type="text" value="" disabled/>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col sm={6}>
                  <label>Tanggal Peminjaman</label>
                </Col>

                <Col sm={6}>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col sm={6}>
                  <label>Waktu Peminjaman</label>
                </Col>

                <Col sm={3}>
                  <FormSelect onChange={handleJamMulaiChange} required>
                    <option>Jam Mulai</option>
                    {jamData.map((jam) => (
                      <option key={jam.id} value={jam.jam}>
                        {jam.jam}
                      </option>
                    ))}
                  </FormSelect>
                </Col>

                <Col sm={3}>
                  <FormSelect onChange={handleJamSelesaiChange} required>
                    <option>Jam Selesai</option>
                    {jamData.map((jam) => (
                      <option key={jam.id} value={jam.jam}>
                        {jam.jam}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>

              {/* <Row>
                <Col>
                  <label>Fasilitas</label>
                </Col>
                <Col>
                  {fasilitasData.map((barang) => (
                    <div key={barang.id}>
                      <input
                        type="checkbox"
                        id={barang.id}
                        name="fasilitas"
                        value={barang.nama_barang}
                        checked={selectedFasilitas.includes(barang.nama_barang)} // Atur checked berdasarkan seleksi
                        onChange={handleCheckboxChange} // Gunakan onChange untuk menangani perubahan
                        className="mb-3"
                      />
                      <label htmlFor={barang.id}>{barang.nama_barang}</label>
                    </div>
                  ))}
                </Col>
              </Row> */}
            </Col>
            <Container className="d-flex justify-content-end mt-3">
              <Button onClick={handlePinjam}>Pinjam</Button>
            </Container>
          </Card>
        </Container>
      </form>
    </div>
  );
};

export default FormPinjam;
