import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ fetchFiles, fetchActivityLogs }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));

    await axios.post('http://localhost:5000/upload', formData);
    fetchFiles();
    fetchActivityLogs();
  };

  return (
    <div>
      <h2>Upload Files</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
