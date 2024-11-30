import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import UploadedFiles from './components/UploadedFiles';
import ActivityLogs from './components/ActivityLogs';

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    fetchFiles();
    fetchActivityLogs();
  }, []);

  const fetchFiles = async () => {
    const response = await axios.get('http://localhost:5000/files');
    setUploadedFiles(response.data);
  };

  const fetchActivityLogs = async () => {
    const response = await axios.get('http://localhost:5000/activity_logs');
    setActivityLogs(response.data);
  };

  return (
    <div className="App">
      <h1>File Uploader</h1>
      <FileUpload fetchFiles={fetchFiles} fetchActivityLogs={fetchActivityLogs} />
      <UploadedFiles uploadedFiles={uploadedFiles} fetchFiles={fetchFiles} />
      <ActivityLogs activityLogs={activityLogs} />
    </div>
  );
};

export default App;
