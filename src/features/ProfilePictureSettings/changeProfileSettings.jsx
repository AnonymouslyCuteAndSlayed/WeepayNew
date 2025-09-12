import React, { useState } from 'react';

const ChangeProfileSettings = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      // Here you would typically send the file to the server
      alert('Profile picture updated successfully!');
      // Reset the state
      setSelectedFile(null);
      setPreview(null);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div className="change-profile-settings">
      <h2>Change Profile Picture</h2>
      <div className="current-picture">
        <h3>Current Profile Picture</h3>
        <img src={preview || '/default-profile.png'} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
      </div>
      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default ChangeProfileSettings;
