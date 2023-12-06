import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Lessons.css";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../service/firebase";
import Loading from "../Loading/Loading";

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lesson_cards, setLessonCards] = useState([]); // [lesson_card, lesson_card, ...

  useEffect(() => {
    const difficultyOrder = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
    };

    onSnapshot(collection(db, "lessons"), (snapshot) => {
      setIsLoading(true);
      const output = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      output.sort((a, b) => {
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });

      setLessons(output);
    });
  }, []);

  useEffect(() => {
    if (lessons.length !== 0) {
      const lesson_cards = lessons.map((lesson) => (
        <div key={lesson.id} className="col-3 d-flex">
          <div className="card lesson-card">
            <div className="card-body d-flex flex-column ">
              <h5 className="card-title">{lesson.title}</h5>
              <p className="truncate-text flex-fill">{lesson.description}</p>
              <Link
                to="/modules"
                state={{ lesson_id: lesson.id }}
                className="mt-auto"
              >
                <div className="btn btn-secondary">Start Lesson</div>
              </Link>
            </div>
          </div>
        </div>
      ));
      setLessonCards(lesson_cards);
      setIsLoading(false);
    }
  }, [lessons]);

  if (!isLoading) {
    return (
      <div className="container mt-5">
        <h1 className="title">Lessons Page</h1>
        <div className="row">{lesson_cards}</div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default LessonsPage;
