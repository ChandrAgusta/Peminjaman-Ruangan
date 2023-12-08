import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  Modal,
  Form,
  CardHeader,
} from "react-bootstrap";
import Swal from "sweetalert2";
import * as api from "../utils/constants";
import Layout from "../layouts";

function DashboardAdmin() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [dataSekretariat, setDataSekretariat] = useState({
    name: "",
    password: "",
  });
  const [sekretariat, setSekretariat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sekretariatData = await api.getSekretariatData();
        setSekretariat(sekretariatData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setShowAddModal(false);
    setDataSekretariat({ name: "", password: "" });
  };

  const handleSubmit = () => {
    if (!dataSekretariat.name || !dataSekretariat.password) {
      Swal.fire({
        title: "Semua Kolom Harus Diisi",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    api
      .postSekretariatData(dataSekretariat)
      .then((response) => {
        setShowAddModal(false);
        setDataSekretariat({ name: "", password: "" });
        Swal.fire({
          title: "Data Sekretariat Berhasil Ditambahkan",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        // Refresh data setelah berhasil menambahkan
        const updatedData = [...sekretariat, response];
        setSekretariat(updatedData);
      })
      .catch((error) => {
        console.error("Gagal menambahkan data:", error);
        Swal.fire({
          title: "Gagal Menambahkan Data Sekretariat",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .deleteSekretariatData(id)
          .then(() => {
            const updatedData = sekretariat.filter(
              (sekretariat) => sekretariat.id !== id
            );
            setSekretariat(updatedData);

            Swal.fire({
              icon: "success",
              title: "Terhapus!",
              text: "Data sekretariat telah dihapus.",
              showConfirmButton: false,
              timer: 1500, // Menambah sedikit waktu untuk pesan agar terbaca
            });
          })
          .catch((error) => {
            console.error("Gagal menghapus data:", error);
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: "Terjadi kesalahan saat menghapus data sekretariat.",
              showConfirmButton: false,
              timer: 1500, // Menambah sedikit waktu untuk pesan agar terbaca
            });
          });
      }
    });
  };

  return (
    <div>
      <Layout />
      <Container style={{ marginTop: "15vh" }}>
        <Card>
          <CardHeader>
            <h3>Kelola Akun Sekretariat</h3>
          </CardHeader>
          <Card.Body>
            <Button onClick={() => setShowAddModal(true)}>
              Tambah Sekretariat
            </Button>
            <Table striped bordered hover style={{ marginTop: "3vh" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {sekretariat.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                    
                      <Button
                        className="btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Modal Tambah Sekretariat */}
        <Modal show={showAddModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Sekretariat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama sekretariat"
                  value={dataSekretariat.name}
                  onChange={(e) =>
                    setDataSekretariat({
                      ...dataSekretariat,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password sekretariat"
                  value={dataSekretariat.password}
                  onChange={(e) =>
                    setDataSekretariat({
                      ...dataSekretariat,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default DashboardAdmin;
