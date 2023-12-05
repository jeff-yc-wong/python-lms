import React, { useState } from "react";
import "./ModuleList.css";

const ModulesList = () => {
  const [expandedModules, setExpandedModules] = useState([]);

  const modules = [
    {
      id: 1,
      title: "1: Hello World",
      submodules: [
        {
          id: 101,
          title: "1.1: Welcome",
          exercises: [
            { id: 1001, title: "1.1.1: Hello World" },
            { id: 1002, title: "1.1.2: Variables" },
          ],
        },
        {
          id: 102,
          title: "1.2: Comments",
          exercises: [
            { id: 1003, title: "1.2.1: Output" },
            { id: 1004, title: "1.2.2: Input" },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "2: Control Flow",
      exercises: [
        { id: 201, title: "2.1: Conditional Math" },
        { id: 202, title: "2.2: If/Else Statement" },
      ],
    },
    // Add more modules and submodules as needed
  ];

  const handleModuleClick = (moduleId) => {
    setExpandedModules((prevState) => {
      if (prevState && prevState.includes(moduleId)) {
        return prevState.filter((id) => id !== moduleId);
      } else {
        return [...(prevState || []), moduleId];
      }
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Modules List</h1>
      {
        // Checks if there are modules then create a list group for each module
        modules.length !== 0 &&
          modules.map((module) => (
            <ul key={`${module.id}_main_list`} className="mb-3  list-group">
              <li key={module.id} className="list-group-item">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleModuleClick(module.id)}
                >
                  {module.title}
                  <span className="triangle">
                    {expandedModules.includes(module.id) ? "▼" : "▶"}
                  </span>
                </div>

                {
                  // Checks if the module is expanded
                  expandedModules.includes(module.id) && (
                    <ul key={`${module.id}_sub_list`} className="list-group mt-2">
                      {
                        // Checks if there are submodules then create a list group for each submodule
                        "submodules" in module &&
                          module.submodules.map((submodule) => (
                            <li key={submodule.id} className="list-group-item">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => handleModuleClick(submodule.id)}
                              >
                                {submodule.title}
                                {"exercises" in submodule && (
                                  <span className="triangle">
                                    {expandedModules.includes(submodule.id)
                                      ? "▼"
                                      : "▶"}
                                  </span>
                                )}
                              </div>
                              {
                                // Checks if the submodule is expanded and then create list-group items for each exercise
                                expandedModules.includes(submodule.id) &&
                                  "exercises" in submodule && (
                                    <ul className="list-group mt-2">
                                      {
                                        // Maps through the exercises to create list-group items for each exercise
                                        submodule.exercises.map(
                                          (subsubmodule) => (
                                            <li
                                              key={subsubmodule.id}
                                              className="list-group-item"
                                            >
                                              {subsubmodule.title}
                                            </li>
                                          )
                                        )
                                      }
                                    </ul>
                                  )
                              }
                            </li>
                          ))
                      }

                      {
                        // Checks if there are exercises then create a list group for each exercise
                        "exercises" in module &&
                          module.exercises.map((exercise) => (
                            <li key={exercise.id} className="list-group-item">
                              {exercise.title}
                            </li>
                          ))
                      }
                    </ul>
                  )
                }
              </li>
            </ul>
          ))
      }
    </div>
  );
};

export default ModulesList;
