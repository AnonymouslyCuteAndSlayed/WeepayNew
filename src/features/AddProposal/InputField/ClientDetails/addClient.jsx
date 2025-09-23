import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import "../../../../styles/AddProposal/mainCalculator.css"
import AddClientModal from "./addClient"

function BasicInfoPage({ formData, setFormData, onNext, onPrevious, currentStep, totalSteps }) {
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoadingClients(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockClients = [
          { id: 1, name: 'Acme Corporation', email: 'contact@acme.com' },
          { id: 2, name: 'Tech Solutions Ltd', email: 'info@techsolutions.com' },
          { id: 3, name: 'Global Industries', email: 'hello@globalind.com' },
          { id: 4, name: 'Innovation Labs', email: 'team@innovationlabs.com' },
          { id: 5, name: 'Future Systems', email: 'contact@futuresys.com' }
        ];

        setClients(mockClients);
        setLoadingClients(false);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setLoadingClients(false);
      }
    };

    fetchClients();
  }, []);

  const calculateEndDate = (startDate, durationWeeks) => {
    if (!startDate || !durationWeeks) return '';
    const start = new Date(startDate);
    const end = new Date(start);
    const days = parseInt(durationWeeks) * 7; // convert weeks → days
    end.setDate(start.getDate() + days);
    return end.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    const selectedClient = clients.find(client => client.id.toString() === clientId);
    setFormData(prev => ({
      ...prev,
      clientId,
      clientName: selectedClient ? selectedClient.name : '',
      clientEmail: selectedClient ? selectedClient.email : ''
    }));
  };

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setFormData(prev => {
      const endDate = calculateEndDate(startDate, prev.projectDuration);
      return { ...prev, startDate, endDate };
    });
  };

  const handleDurationChange = (e) => {
    const duration = e.target.value;
    setFormData(prev => {
      const endDate = calculateEndDate(prev.startDate, duration);
      return { ...prev, projectDuration: duration, endDate };
    });
  };

  const handleAddClient = () => {
    setShowAddClientModal(true);
  };

  const handleCloseModal = () => {
    setShowAddClientModal(false);
  };

  const handleClientAdded = (newClient) => {
    // Add the new client to the clients list
    setClients(prev => [...prev, newClient]);
    // Optionally select the new client automatically
    setFormData(prev => ({
      ...prev,
      clientId: newClient.id.toString(),
      clientName: newClient.name,
      clientEmail: newClient.email
    }));
    // Close the modal
    setShowAddClientModal(false);
  };

  const handleNext = () => {
    if (!formData.clientId || !formData.projectTitle || !formData.startDate || !formData.projectDuration) {
      alert('Please fill in all required fields');
      return;
    }
    onNext();
  };

  return (
    <div className="row mt-5">
      {/* LEFT COLUMN */}
      <div className="col-12 col-md-6 ">
        <div className="mb-4 ">
          {/* Select Client + Button */}
          <div>
            <label className="form-label text-muted">
              Select Client Name
            </label>
            <div className="d-flex gap-2">
              <select
                value={formData.clientId || ""}
                onChange={handleClientChange}
                className="form-select flex-fill input"
              >
                <option value="">Choose a client...</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAddClient}
                className="btn btn-primary add-button w-6"
              >
                + Add 
              </button>
            </div>
          </div>
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="form-label text-muted">
            Start Date
          </label>
          <input
            type="date"
            value={formData.startDate || ""}
            onChange={handleStartDateChange}
            className="form-control"
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label className="form-label text-muted">
            End Date
          </label>
          <input
            type="date"
            value={formData.endDate || ""}
            disabled
            className="form-control"
          />
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-12 col-md-6">
        <div className="mb-4">
          {/* Project Title */}
          <div>
            <label className="form-label text-muted">
              Select or Input Project Title
            </label>
            <input
              type="text"
              value={formData.projectTitle || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, projectTitle: e.target.value }))
              }
              className="form-control"
              placeholder="Enter project title"
            />
          </div>
        </div>

        {/* Project Duration */}
          <div className="mb-4">
            <label className="form-label text-muted">
              Project Duration (Weeks)
            </label>
            <input
              type="number"
              min="1"
              value={formData.projectDuration || ""}
              onChange={handleDurationChange}
              className="form-control"
              placeholder="Enter duration in weeks"
            />
          </div>

        {/* Estimation Date */}
        <div className="mb-4">
          <label className="form-label text-muted">
            Estimation Date
          </label>
          <input
            type="date"
            value={formData.estimationDate || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                estimationDate: e.target.value,
              }))
            }
            className="form-control"
          />
        </div>
      </div>
      
      {/* Button Container */}
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
          <button
            className="nextButton btn btn-primary"
            onClick={handleNext}
          >
            Next
          </button>
      </div>

      {/* Add Client Modal */}
      {showAddClientModal && (
        <AddClientModal
          isOpen={showAddClientModal}
          onClose={handleCloseModal}
          onAddClient={handleClientAdded}
        />
      )}
    </div>
  );
}

export default BasicInfoPage;