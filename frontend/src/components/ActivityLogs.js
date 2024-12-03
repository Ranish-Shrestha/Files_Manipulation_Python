import React from 'react';
import { Table } from 'react-bootstrap';

const ActivityLogs = ({ activityLogs }) => {
  return (
    <div>
      <Table striped bordered hover responsive="sm">
        <thead >
          <tr>
            <th>Action</th>
            <th>File Name</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {activityLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.action.charAt(0).toUpperCase() + log.action.slice(1)}</td>
              <td>{log.details.filename}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ActivityLogs;
