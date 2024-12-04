import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, InputGroup, Alert, Toast, ToastContainer } from 'react-bootstrap';

const FileUpload = ({ fetchFiles, fetchActivityLogs }) => {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [inputKey, setInputKey] = useState(Date.now());
  const [showMessage, setShowMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const toggleShowMessage = () => setShowMessage(!showMessage);

  const handleFileChange = (e) => {
    setMessages([]);
    setShowMessage(false);

    setErrors([]);
    const errors = [];

    const selectedFiles = Array.from(e.target.files);
    const filteredFiles = selectedFiles.filter(file =>
      file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    if (filteredFiles.length !== selectedFiles.length) {
      errors.push('Only PDF or DOCX files are allowed');
    }

    setErrors(errors);
    setFiles(filteredFiles);
  };

  const validateFiles = (files) => {
    const errors = [];
    const validFiles = [];

    files.forEach(file => {
      if (file.size === 0) {
        errors.push(`${file.name} is empty.`);
      } else {
        validFiles.push(file);
      }
    });

    setErrors(errors);
    return validFiles;
  };

  const handleFileUpload = async () => {
    setMessages([]);
    setShowMessage(false);

    const validFiles = validateFiles(files);

    if (validFiles.length === 0) {
      return; // No valid files to upload
    }

    const formData = new FormData();
    validFiles.forEach(file => formData.append('files', file)); // Use validFiles instead of files

    try {
      const res = await axios.post('http://localhost:8000/upload', formData);
      setFiles([]);
      setErrors([]);
      setInputKey(Date.now());

      let msg = [], errs = [];
      res.data.forEach((data) => {
        if (data.status_code === 200) {
          msg.push(`File: ${data.filename} - Status: ${data.status}`);
        } else {
          errs.push(`File: ${data.filename} - Status: ${data.status} - Error Code: ${data.status_code}`);
        }
      });

      setMessages(msg);
      setErrors(errs);

      setShowMessage(true);

      fetchFiles();
      fetchActivityLogs();
    } catch (err) {
      let errs = [];
      console.log(err.response?.data?.detail || 'Upload failed');
      errs.push(err.response?.data?.detail || 'Upload failed');
      setErrors(errs);
    }
  };

  return (
    <div style={{ justifyItems: 'center' }}>
      <h2>Upload Files</h2>
      <InputGroup style={{ width: '50%' }} className='mb-3'>
        <Form.Control key={inputKey} type="file" multiple onChange={handleFileChange} accept='.pdf, .docx' />
        <Button onClick={handleFileUpload}>Upload</Button>
      </InputGroup>
      {errors.length > 0 && (
        <Alert variant='danger'>
          <h4>Errors:</h4>
          <ul>{errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}</ul>
        </Alert>
      )}
      {messages.length > 0 && (
        <ToastContainer className="p-3" position='middle-center' style={{ zIndex: 1 }}>
          <Toast show={showMessage} onClose={toggleShowMessage} bg={'success'} style={{ width: '100%' }}>
            <Toast.Header>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body className={'text-white'}>
              <ul>{messages.map((msg, index) => <li key={index}>{msg}</li>)}</ul>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
};

export default FileUpload;
