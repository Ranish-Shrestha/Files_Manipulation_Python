import React from 'react';
import FileUpload from '../components/FileUpload';

const HomePage = ({ fetchFiles, fetchActivityLogs }) => {
  return (
    <div className="page">
      <h2>Home Page</h2>
      <FileUpload fetchFiles={fetchFiles} fetchActivityLogs={fetchActivityLogs} />
    </div>
  );
};

export default HomePage;
