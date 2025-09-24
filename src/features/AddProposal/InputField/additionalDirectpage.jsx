import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";

function AdditionalDirectCosts({ onNext, onPrevious, onSkip, currentStep }) {
  const [costRows, setCostRows] = useState([
    {
      id: 1,
      description: "",
      quantity: "",
      unitCost: "",
      totalCost: "",
      type: "",
    },
  ]);

  const handleChange = (id, field, value) => {
    const updatedRows = costRows.map((row) =>
      row.id === id
        ? {
            ...row,
            [field]: value,
            totalCost:
              field === "quantity" || field === "unitCost"
                ? (parseFloat(field === "quantity" ? value : row.quantity) || 0) *
                  (parseFloat(field === "unitCost" ? value : row.unitCost) || 0)
                : row.totalCost,
          }
        : row
    );
    setCostRows(updatedRows);
  };

  const addRow = () => {
    const newId =
      costRows.length > 0 ? costRows[costRows.length - 1].id + 1 : 1;
    setCostRows([
      ...costRows,
      {
        id: newId,
        description: "",
        quantity: "",
        unitCost: "",
        totalCost: "",
        type: "",
      },
    ]);
  };

  const deleteRow = (id) => {
    const updatedRows = costRows.filter((row) => row.id !== id);
    setCostRows(updatedRows);
  };

  const totalAdditionalCost = costRows.reduce(
    (sum, row) => sum + (parseFloat(row.totalCost) || 0),
    0
  );

  const handleNext = () => {
    if (onNext) onNext(costRows, totalAdditionalCost);
  };

  return (
    <Container
      className="my-4"
      style={{
        maxHeight: "300px",
        overflowY: costRows.length > 3 ? "auto" : "visible",
      }}
    >
      <h5 className="fw-bold mb-3 fs-2">Additional Direct Costs</h5>

      <Table bordered hover responsive className="align-middle">
        <thead className="table-secondary text-center ">
          <tr>
            <th className="custom-font" style={{backgroundColor: 'white'}}>Description</th>
            <th className="custom-font" style={{ width: "120px", backgroundColor: 'white' }}>Quantity</th>
            <th className="custom-font" style={{ width: "150px", backgroundColor: 'white' }}>Unit Cost (PHP)</th>
            <th className="custom-font" style={{ width: "150px", backgroundColor: 'white' }}>Total Cost (PHP)</th>
            <th className="custom-font" style={{ width: "150px", backgroundColor: 'white' }}>Type</th>
            <th className="custom-font" style={{ width: "80px", backgroundColor: 'white' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {costRows.map((row) => (
            <tr key={row.id}>
              <td>
                <Form.Control
                  type="text"
                  value={row.description}
                  onChange={(e) =>
                    handleChange(row.id, "description", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  className="no-spinner custom-font "
                  type="number"
                  min="0"
                  value={row.quantity}
                  onChange={(e) =>
                    handleChange(row.id, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  className="no-spinner custom-font"
                  type="number"
                  min="0"
                  value={row.unitCost}
                  onChange={(e) =>
                    handleChange(row.id, "unitCost", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control type="number" value={row.totalCost} readOnly />
              </td>
              <td>
                <Form.Select
                  value={row.type}
                  onChange={(e) => handleChange(row.id, "type", e.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="material">Internal Cost</option>
                  <option value="service">Pass-through</option>
                </Form.Select>
              </td>
              <td className="text-center">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteRow(row.id)}
                  disabled={costRows.length === 1}
                >
                  ✕
                </Button>
              </td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold" >
            <td colSpan={3}style={{ backgroundColor: "rgba(210, 205, 205, 1)" }}>TOTAL ADDITIONAL COSTS:</td>
            <td style={{ backgroundColor: "rgba(210, 205, 205, 1)" }}>
              <Form.Control
                type="number"
                value={totalAdditionalCost}
                readOnly
              />
            </td>
            <td colSpan={2} style={{ backgroundColor: "rgba(210, 205, 205, 1)" }}></td>
          </tr>
        </tbody>
      </Table>

      <Button variant="primary" onClick={addRow}>
        + Add Row
      </Button>

      {/* Navigation Buttons */}
      <div className="button-container mt-4 d-flex justify-content-between">
        {currentStep > 0 && (
          <button
            className="previousButton btn btn-secondary"
            onClick={onPrevious}
          >
            Previous
          </button>
        )}

        <div>
          {onSkip && (
            <button
              className="skip-btn btn btn-outline-secondary me-2"
              onClick={onSkip}
            >
              Skip
            </button>
          )}
          <button className="nextButton btn btn-primary" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </Container>
  );
}

export default AdditionalDirectCosts;
