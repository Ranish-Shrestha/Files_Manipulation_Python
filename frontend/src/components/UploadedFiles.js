import React from 'react';
import axios from 'axios';

const UploadedFiles = ({ uploadedFiles, fetchFiles }) => {
  const handleFileDownload = async (fileId, fileType) => {
    const response = await axios.get(`http://localhost:5000/download/${fileId}/${fileType}`, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `file.${fileType}`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map(file => (
          <li key={file._id}>
            {file.filename} ({file.file_extension}) - {file.file_size} bytes
            <button onClick={() => handleFileDownload(file._id, 'pdf')}>Download as PDF</button>
            <button onClick={() => handleFileDownload(file._id, 'docx')}>Download as DOCX</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedFiles;
