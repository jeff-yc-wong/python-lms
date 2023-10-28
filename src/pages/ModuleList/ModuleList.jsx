import React from 'react';

const ModuleList = () => {
  const Module = [
    { id: 1, title: 'Module 1: Introduction to React' },
    { id: 2, title: 'Module 2: Components and Props' },
    { id: 3, title: 'Module 3: State and Lifecycle' },
    // Add more Modules as needed
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-light">Module List</h1>
      <ul className="list-group">
        {Module.map(Module => (
          <li key={Module.id} className="list-group-item">{Module.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ModuleList;
