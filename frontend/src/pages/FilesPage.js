import React from 'react';
import UploadedFiles from '../components/UploadedFiles';

const FilesPage = ({ uploadedFiles, fetchFiles }) => {
  return (
    <div className="page">
      <h2>Uploaded Files</h2>
      <UploadedFiles uploadedFiles={uploadedFiles} fetchFiles={fetchFiles} />
    </div>
  );
};

export default FilesPage;
