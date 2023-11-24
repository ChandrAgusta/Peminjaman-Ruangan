import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Form, Col } from "react-bootstrap";

function Modals() {
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState("1");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mt-3 mb-2">
        Pilih Tanggal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pilih Waktu Peminjaman</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <h5 className="mb-3"> Masukkan Tanggal</h5>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>Tanggal</option>
                {Array.from({ length: 31 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
                {/* <option value="2">2</option>
                <option value="3">3</option> */}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>Bulan</option>
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>Tahun</option>
                <option value="1">2023</option>
                <option value="2">2024</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3">
            <h5>Pilih Durasi Peminjaman</h5>
            <Col className="col-4">
              <Form.Select
                aria-label="Default select example"
                onChange={handleDuration}
                value={duration}
              >
                <option>Durasi</option>
                <option value="1">1 Jam</option>
                <option value="2">2 Jam</option>
                <option value="3">3 Jam</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3">
            <h5>Masukkan Jam</h5>
            <Col className="col-4">
              <Form.Select aria-label="Default select example">
                <option>Jam</option>
                {duration === "1" ? (
                  <>
                    <option value="1">07.00-08.00</option>
                    <option value="2">08.00-09.00</option>
                  </>
                ) : duration === "2" ? (
                  <>
                    <option value="1">07.00-09.00</option>
                    <option value="2">09.00-11.00</option>
                  </>
                ) : duration === "3" ? (
                  <>
                    <option value="1">07.00-10.00</option>
                    <option value="2">10.00-13.00</option>
                  </>
                ) : null}
              </Form.Select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default Modals;
