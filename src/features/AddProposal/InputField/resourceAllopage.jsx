import React, { useState } from 'react';
import "../../../styles/AddProposal/mainCalculator.css"

function ResourceAllocationPage({ setFormData, onNext, onPrevious, currentStep }) {
  const [resourceRows, setResourceRows] = useState([
    {
      id: 1,
      role: 'Software Engineers',
      fte: '',
      baseMonthly: '',
      withOverhead: '',
      weeklyRate: '',
      totalCost: ''
    }
  ]);

  const calculateDerivedValues = (fte, baseMonthly) => {
    if (!fte || !baseMonthly) {
      return { withOverhead: '', weeklyRate: '', totalCost: '' };
    }

    const fteNum = parseFloat(fte);
    const baseMonthlyNum = parseFloat(baseMonthly);

    const withOverhead = baseMonthlyNum * 1.2;
    const weeklyRate = withOverhead / 4.33; 
    const totalCost = withOverhead * fteNum;

    return {
      withOverhead: withOverhead.toFixed(2),
      weeklyRate: weeklyRate.toFixed(2),
      totalCost: totalCost.toFixed(2)
    };
  };

  const handleInputChange = (rowId, field, value) => {
    const updatedRows = resourceRows.map(row => {
      if (row.id === rowId) {
        const updatedRow = { ...row, [field]: value };

        if (field === 'fte' || field === 'baseMonthly') {
          const { withOverhead, weeklyRate, totalCost } = calculateDerivedValues(
            field === 'fte' ? value : updatedRow.fte,
            field === 'baseMonthly' ? value : updatedRow.baseMonthly
          );

          updatedRow.withOverhead = withOverhead;
          updatedRow.weeklyRate = weeklyRate;
          updatedRow.totalCost = totalCost;
        }

        return updatedRow;
      }
      return row;
    });

    setResourceRows(updatedRows);

    setFormData(prev => ({
      ...prev,
      resourceAllocation: updatedRows
    }));
    
  };

  const addRow = () => {
    const newRow = {
      id: Date.now(), 
      role: '',
      fte: '',
      baseMonthly: '',
      withOverhead: '',
      weeklyRate: '',
      totalCost: ''
    };

    setResourceRows([...resourceRows, newRow]);
  };

  const removeRow = (rowId) => {
    if (resourceRows.length > 1) {
      const updatedRows = resourceRows.filter(row => row.id !== rowId);
      setResourceRows(updatedRows);
      
      setFormData(prev => ({
        ...prev,
        resourceAllocation: updatedRows
      }));
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    const totals = { fte: 0, baseMonthly: 0, withOverhead: 0, weeklyRate: 0, totalCost: 0 };

    resourceRows.forEach(row => {
      totals.fte += parseFloat(row.fte) || 0;
      totals.baseMonthly += parseFloat(row.baseMonthly) || 0;
      totals.withOverhead += parseFloat(row.withOverhead) || 0;
      totals.weeklyRate += parseFloat(row.weeklyRate) || 0;
      totals.totalCost += parseFloat(row.totalCost) || 0;
    });

    return {
      fte: totals.fte.toFixed(1),
      baseMonthly: totals.baseMonthly.toFixed(2),
      withOverhead: totals.withOverhead.toFixed(2),
      weeklyRate: totals.weeklyRate.toFixed(2),
      totalCost: totals.totalCost.toFixed(2)
    };
  };

  const totals = calculateTotals();

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="resource-allocation-container">
      <div>
        <h4 className="fw-bold mb-4 mt-4">Resource Allocation</h4>
      </div>

      <div className="table-responsive" style={{ maxHeight: '200px', overflowY: resourceRows.length > 3? 'auto' : 'visible' }}>
        <table className="table table-bordered text-center">
          <thead className="table-header" style={{ position: resourceRows.length > 3 ? 'sticky' : 'static', top: 0, zIndex: 10, backgroundColor: 'white' }}>
            <tr>
              <th className="text-center fs-6">Role</th>
              <th className="text-center fs-6">FTE</th>
              <th className="text-center fs-6">Base Monthly</th>
              <th className="text-center fs-6">With Overhead</th>
              <th className="text-center fs-6">Weekly Rate</th>
              <th className="text-center fs-6">Total Cost</th>
              <th className="text-center fs-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamic Rows */}
            {resourceRows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="text"
                    value={row.role}
                    onChange={(e) => handleInputChange(row.id, 'role', e.target.value)}
                    className="form-control text-center fs-6"
                    placeholder="Enter role"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={row.fte}
                    onChange={(e) => handleInputChange(row.id, 'fte', e.target.value)}
                    className="form-control text-center fs-6 no-spinner"
                    placeholder="0"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={row.baseMonthly}
                    onChange={(e) => handleInputChange(row.id, 'baseMonthly', e.target.value)}
                    className="form-control text-center fs-6"
                    placeholder="0"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.withOverhead}
                    className="form-control-plaintext text-center fs-6"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.weeklyRate}
                    className="form-control-plaintext text-center fs-6"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.totalCost}
                    className="form-control-plaintext text-center fs-6"
                    readOnly
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeRow(row.id)}
                    title="Remove row"
                    disabled={resourceRows.length === 1}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="total-row">
              <td>
                <strong className='fs-6'>TOTAL LABOR</strong>
              </td>
              <td>
                <input
                  type="text"
                  value={totals.fte}
                  className="form-control-plaintext text-center fs-6"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  value={totals.baseMonthly}
                  className="form-control-plaintext text-center fs-6"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  value={totals.withOverhead}
                  className="form-control-plaintext text-center fs-6"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  value={totals.weeklyRate}
                  className="form-control-plaintext text-center fs-6"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  value={totals.totalCost}
                  className="form-control-plaintext text-center fs-6"
                  readOnly
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-3">
        <button
          type="button"
          className="btn btn-success"
          onClick={addRow}
        >
          + Add Row
        </button>
      </div>

      <div className="button-container">
        <div className="button-left">
          {currentStep > 0 && (
            <button
              className="previousButton btn btn-secondary"
              onClick={onPrevious}
            >
              Previous
            </button>
          )}
        </div>
        <div className="button-right">
          <button className='skip-btn'>
            skip
          </button>
          <button
            className="nextButton btn btn-primary"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}

export default ResourceAllocationPage;