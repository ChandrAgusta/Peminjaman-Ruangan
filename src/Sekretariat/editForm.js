import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Menggunakan useNavigate untuk navigasi
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Container, Card } from "react-bootstrap";
import NavbarComp from "../Component/Navbar";
import Swal from "sweetalert2";

function EditForm() {
  const navigate = useNavigate(); 
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama_ruangan: "",
    kapasitas: 0,
    desc: "",
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/ruangan/${id}`)
      .then((res) => {
        const ruanganData = res.data.data;
        setFormData(ruanganData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    axios
      .put(`${API_URL}/ruangan/${id}`, formData)
      .then((res) => {
        Swal.fire({
          title:'Data Ruangan Berhasil Diedit',
          icon:'success',
          timer:1000,
          showConfirmButton:false
        })
        navigate("/"); 
      })
      .catch((error) => {
        Swal.fire({
          title:'Data Ruangan Gagal Diedit',
          icon:'error',
          timer:1000,
          showConfirmButton:false
        })
      });
  };

  return (
    <div>
      <NavbarComp/>
      <Container style ={{ marginTop:'16vh' }}>
        <Card className="p-4">
          <h2>Edit Data Ruangan</h2>
          <form>
            <div className="form-group">
              <label htmlFor="nama_ruangan">Nama Ruangan</label>
              <input
                type="text"
                name="nama_ruangan"
                value={formData.nama_ruangan}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="kapasitas">Kapasitas</label>
              <input
                type="number"
                name="kapasitas"
                value={formData.kapasitas}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Deskripsi</label>
              <input
                type="text"
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <Container className="d-flex justify-content-end mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Simpan Perubahan
            </button>

            </Container>
          </form>
        </Card>
      </Container>
    </div>
  );
}

export default EditForm;
