import React from 'react';
import ActivityLogs from '../components/ActivityLogs';

const LogsPage = ({ activityLogs }) => {
  return (
    <div className="page">
      <h2>Activity Logs</h2>
      <ActivityLogs activityLogs={activityLogs} />
    </div>
  );
};

export default LogsPage;
