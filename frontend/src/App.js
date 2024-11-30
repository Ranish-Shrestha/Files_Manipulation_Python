import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    const response = await axios.get('http://localhost:5000/files');
    setUploadedFiles(response.data);
  };

  const fetchActivityLogs = async () => {
    const response = await axios.get('http://localhost:5000/activity_logs');
    setActivityLogs(response.data);
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <HomePage fetchFiles={fetchFiles} fetchActivityLogs={fetchActivityLogs} />
          </Route>
          <Route path="/files">
            <FilesPage uploadedFiles={uploadedFiles} fetchFiles={fetchFiles} />
          </Route>
          <Route path="/logs">
            <LogsPage activityLogs={activityLogs} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
