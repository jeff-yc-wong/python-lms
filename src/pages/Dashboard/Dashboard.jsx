import React from 'react';
import './Dashboard.css';

const ProgressBar = ({ moduleNumber, label, progress }) => {
  const barStyle = {
    width: `${progress}%`,
    height: '20px',
    backgroundColor: '#007BFF', // Customize the color
  };

  return (
    <div className="progress-bar">
      <div className="bar-label">
        Module {moduleNumber}: {label}
      </div>
      <div className="bar-container">
        <div className="bar" style={barStyle}></div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const moduleProgress = [
    { moduleNumber: 1, module: 'Intro to Python', progress: 100 },
    { moduleNumber: 2, module: 'Control and Flow', progress: 80 },
    { moduleNumber: 3, module: 'Functions', progress: 60 },
    { moduleNumber: 4, module: 'Arrays', progress: 40 },
    // Replace with actual student progress data
  ];

  return (
    <div className="container mt-5">
      <h1 className="title">Student Progress Dashboard</h1>
      <div>
        {/* <h2>Module Progress</h2> */}
        {moduleProgress.map((module, index) => (
          <ProgressBar
            key={index}
            moduleNumber={module.moduleNumber}
            label={module.module}
            progress={module.progress}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
