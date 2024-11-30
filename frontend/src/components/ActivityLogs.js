import React from 'react';

const ActivityLogs = ({ activityLogs }) => {
  return (
    <div>
      <h2>Activity Logs</h2>
      <ul>
        {activityLogs.map((log, index) => (
          <li key={index}>
            {log.action} - {log.details.filename} at {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLogs;
