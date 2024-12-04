import React from 'react';
import UploadedFiles from '../components/UploadedFiles';

const FilesPage = ({ uploadedFiles, fetchFiles, fetchActivityLogs }) => {
  return (
    <div className="page">
      <h2>Uploaded Files</h2>
      <UploadedFiles uploadedFiles={uploadedFiles} fetchFiles={fetchFiles} fetchActivityLogs={fetchActivityLogs} />
    </div>
  );
};

export default FilesPage;
