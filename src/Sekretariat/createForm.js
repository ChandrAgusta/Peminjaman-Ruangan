import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import Swal from 'sweetalert2';

function Example() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    nama_ruangan: '',
    kapasitas: '',
    desc: '',
  });

  const handleClose = () => {
    setShow(false);
    // Reset the form fields when closing the modal
    setFormData({
      nama_ruangan: '',
      kapasitas: '',
      desc: '',
    });
  };

  const handleShow = () => setShow(true);

  // Function to handle form submission
  const handleSubmit = () => {

    if (!formData.nama_ruangan || !formData.kapasitas || !formData.desc) {
        // If any required field is empty, display an error message or prevent submission
        // alert('Semua kolom harus diisi!');
        Swal.fire({
          title:'Semua Kolom Harus Diisi',
          icon:'warning',
          timer:2000,
          showConfirmButton:false
        })
        return;
      }

    // Example API call (replace with your actual API endpoint)
    axios.post(`${API_URL}/ruangan`, formData)
      .then((response) => {
        // console.log('Data submitted successfully', response.data);
        Swal.fire({
          title:'Data Ruangan Berhasil Ditambahkan',
          icon:'success',
          timer:1000,
          showConfirmButton:false
        })
        handleClose(); // Close the modal
      })
      .catch((error) => {
        // console.error('Error submitting data', error);
        Swal.fire({
          title:'Data Gagal Ditambahkan',
          icon:'error',
          timer:1000,
          showConfirmButton:false
        })
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Tambah Ruangan
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Ruangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="nama_ruangan">Nama Ruangan</label>
              <input
                type="text"
                id="nama_ruangan"
                name="nama_ruangan"
                value={formData.nama_ruangan}
                onChange={(e) => setFormData({ ...formData, nama_ruangan: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="kapasitas">Kapasitas</label>
              <input
                type="number"
                id="kapasitas"
                name="kapasitas"
                value={formData.kapasitas}
                onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Deskripsi</label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
