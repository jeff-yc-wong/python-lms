import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import db from "../../service/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Loading from "../Loading/Loading";

import "./ModuleList.css";

const ModulesList = () => {
  const [expandedModules, setExpandedModules] = useState(
    localStorage.getItem("expandedModules")
      ? JSON.parse(localStorage.getItem("expandedModules"))
      : []
  );
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [moduleCards, setModuleCards] = useState([]);
  const url = useLocation();

  useEffect(() => {
    localStorage.setItem("expandedModules", JSON.stringify(expandedModules));
  });

  useEffect(() => {
    setIsLoading(true);

    // Error Checking
    if (url.state != null) {
      if ("lesson_id" in url["state"]) {
        var lesson_id = url.state.lesson_id;
      } else {
        setHasError(true);
        return () => {};
      }
    } else {
      setHasError(true);
      return () => {};
    }

    const fetchData = async () => {
      let q = query(
        collection(db, "lessons", lesson_id, "modules"),
        orderBy("order")
      );
      const snapshot = await getDocs(q);
      const output = await Promise.all(
        snapshot.docs.map(async (doc) => {
          // Inside each module

          //Check if there are submodules
          q = query(
            collection(
              db,
              "lessons",
              lesson_id,
              "modules",
              doc.id,
              "submodules"
            ),
            orderBy("order")
          );
          let submodules = await getDocs(q);

          if (submodules.docs.length !== 0) {
            submodules = await Promise.all(
              submodules.docs.map(async (submodule) => {
                // inside submodules
                q = query(
                  collection(
                    db,
                    "lessons",
                    lesson_id,
                    "modules",
                    doc.id,
                    "submodules",
                    submodule.id,
                    "exercises"
                  ),
                  orderBy("order")
                );
                let exercises = await getDocs(q);

                exercises = exercises.docs.map((exercise) => {
                  return { id: exercise.id, ...exercise.data() };
                });

                return {
                  id: submodule.id,
                  ...submodule.data(),
                  exercises: exercises,
                };
              })
            );

            return { id: doc.id, ...doc.data(), submodules: submodules };
          }
          q = query(
            collection(
              db,
              "lessons",
              lesson_id,
              "modules",
              doc.id,
              "exercises"
            ),
            orderBy("order")
          );
          // let exercises = await getDocs(q);
          // exercises = exercises.docs.map((exercise) => {
          //   return { id: exercise.id, ...exercise.data() };
          // });

          return { id: doc.id, ...doc.data() };
        })
      );
      // console.log(output)
      setModules(output);
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    const handleModuleClick = (moduleId) => {
      setExpandedModules((prevState) => {
        if (prevState && prevState.includes(moduleId)) {
          return prevState.filter((id) => id !== moduleId);
        } else {
          return [...(prevState || []), moduleId];
        }
      });
    };

    if (modules.length !== 0) {
      const module_cards = modules.map((module, index) => (
        <ul key={`${module.id}_main_list`} className="mb-3  list-group">
          <li key={module.id} className="list-group-item">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleModuleClick(module.id)}
            >
              {`${index + 1}. ${module.title}`}
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
                      module.submodules.map((submodule, subindex) => (
                        <li key={submodule.id} className="list-group-item">
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => handleModuleClick(submodule.id)}
                          >
                            {`${index + 1}.${subindex + 1} ${submodule.title}`}
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
                                      (exercise, exindex) => (
                                        <li
                                          key={exercise.reference}
                                          className="list-group-item"
                                        >
                                          <Link
                                            to="/editor"
                                            state={{
                                              exercise_id: exercise.reference,
                                              module_path: [
                                                module.title,
                                                submodule.title,
                                              ],
                                              exercisesRef: {
                                                index: exindex,
                                                lesson_id: url.state.lesson_id,
                                                exercises: module.exercises,
                                              },
                                            }}
                                            className="text-dark"
                                          >
                                            {`${index + 1}.${subindex + 1}.${
                                              exindex + 1
                                            } ${exercise.title}`}
                                          </Link>
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
                      module.exercises.map((exercise, exindex) => (
                        <li
                          key={exercise.reference}
                          className="list-group-item"
                        >
                          <Link
                            to="/editor"
                            className="text-dark"
                            state={{
                              exercise_id: exercise.reference,
                              module_path: [module.title],
                              exercisesRef: {
                                index: exindex,
                                lesson_id: url.state.lesson_id,
                                exercises: module.exercises,
                              },
                            }}
                          >
                            {`${index + 1}.${exindex + 1} ${exercise.title}`}
                          </Link>
                        </li>
                      ))
                  }
                </ul>
              )
            }
          </li>
        </ul>
      ));
      setModuleCards(module_cards);
      setIsLoading(false);
    }
  }, [modules, expandedModules, url]);

  if (hasError) {
    return <Navigate to="/errors" />;
  }
  if (!isLoading) {
    return (
      <div className="container mt-5">
        <h1 className="title">Modules List</h1>
        {moduleCards}
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default ModulesList;
