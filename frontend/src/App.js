import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import FilesPage from './pages/FilesPage';
import LogsPage from './pages/LogsPage';
import './App.css';

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    fetchFiles();
    fetchActivityLogs();
  }, []);

  const fetchFiles = async () => {
    const response = await axios.get('http://localhost:8000/files');
    setUploadedFiles(response.data);
  };

  const fetchActivityLogs = async () => {
    const response = await axios.get('http://localhost:8000/activity_logs');
    setActivityLogs(response.data);
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage fetchFiles={fetchFiles} fetchActivityLogs={fetchActivityLogs} />} />
          <Route path="/files" element={<FilesPage uploadedFiles={uploadedFiles} fetchFiles={fetchFiles} fetchActivityLogs={fetchActivityLogs} />} />
          <Route path="/logs" element={<LogsPage activityLogs={activityLogs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
