import React from 'react';
import FileUpload from '../components/FileUpload';

const HomePage = ({ fetchFiles, fetchActivityLogs }) => {
  return (
    <div className="page">
      <FileUpload fetchFiles={fetchFiles} fetchActivityLogs={fetchActivityLogs} />
    </div>
  );
};

export default HomePage;
