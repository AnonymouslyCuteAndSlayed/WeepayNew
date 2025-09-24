// AddClientModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { UserRoundPlus, Save, X } from "lucide-react";

function AddClientModal({ show, onClose, onClientAdded, existingClients = [] }) {
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    otherDetails: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show) {
      // reset on close
      setFormData({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
        otherDetails: "",
      });
      setError("");
    }
  }, [show]);

  // clear error while user types
  useEffect(() => {
    if (error) setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.name, formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const normalize = (s) => (s || "").toString().trim().replace(/\s+/g, " ");
  const safeLower = (s) => normalize(s).toLowerCase();

  const handleSave = () => {
    const nameNorm = normalize(formData.name);
    const emailNorm = normalize(formData.email);

    if (!nameNorm || !emailNorm) {
      setError("Client/Company Name and Email are required.");
      return;
    }

    // defensive checks (handles missing client props too)
    const duplicateByName = existingClients.some(
      (c) => safeLower(c?.name) === safeLower(nameNorm)
    );
    const duplicateByEmail = existingClients.some(
      (c) => safeLower(c?.email) === safeLower(emailNorm)
    );

    if (duplicateByName || duplicateByEmail) {
      if (duplicateByName && duplicateByEmail) {
        setError("A client with this name and email already exists.");
      } else if (duplicateByName) {
        setError("A client with this name already exists.");
      } else {
        setError("A client with this email already exists.");
      }
      return;
    }

    // generate safe id (use next max id or timestamp)
    const maxId = existingClients.length
      ? Math.max(...existingClients.map((c) => Number(c?.id || 0)))
      : 0;
    const newId = maxId + 1 || Date.now();

    const newClient = {
      id: newId,
      name: nameNorm,
      contactPerson: normalize(formData.contactPerson),
      phone: normalize(formData.phone),
      email: emailNorm,
      address: normalize(formData.address),
      otherDetails: normalize(formData.otherDetails),
    };

    onClientAdded(newClient);
    // close & reset
    onClose();
    setFormData({
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      otherDetails: "",
    });
    setError("");
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header className="align-items-center">
        <Modal.Title className="fw-bold">
          <UserRoundPlus /> Add Client
        </Modal.Title>
        <Button
          variant="light"
          onClick={onClose}
          className="fs-4 align-items-center"
          style={{ position: "absolute", right: "15px", top: "10px" }}
        >
          <X />
        </Button>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Input Client/Company name: <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Name of contact person:</Form.Label>
                <Form.Control
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <h6 className="fw-bold mt-3">Contact Information</h6>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone or Telephone number:</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  E-mail account: <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Other Details:</Form.Label>
                <Form.Control
                  type="text"
                  name="otherDetails"
                  value={formData.otherDetails}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          <Save size={16} /> Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddClientModal;
