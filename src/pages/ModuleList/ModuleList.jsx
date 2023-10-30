import React, { useState } from 'react';
import './ModuleList.css';

const ModulesList = () => {
  const [expandedModule, setExpandedModule] = useState(null);

  const modules = [
    {
      id: 1,
      title: 'Module 1',
      submodules: [
        { id: 101, title: 'Submodule 1.1' },
        { id: 102, title: 'Submodule 1.2' },
      ],
    },
    {
      id: 2,
      title: 'Module 2',
      submodules: [
        { id: 201, title: 'Submodule 2.1' },
        { id: 202, title: 'Submodule 2.2' },
      ],
    },
    // Add more modules and submodules as needed
  ];

  const handleModuleClick = (moduleId) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className='title'>Module List</h1>
      <ul className="list-group">
        {modules.map(module => (
          <li key={module.id} className="list-group-item">
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => handleModuleClick(module.id)}
            >
              {module.title}
            </div>
            {expandedModule === module.id && (
              <ul className="list-group mt-2">
                {module.submodules.map(submodule => (
                  <li key={submodule.id} className="list-group-item">
                    {submodule.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModulesList;
