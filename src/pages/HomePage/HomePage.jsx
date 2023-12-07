import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../../service/firebase";
import "./HomePage.css";
import Loading from "../Loading/Loading";

const HomePage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const difficultyOrder = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
    };

    onSnapshot(query(collection(db, "lessons")), (snapshot) => {
      setIsLoading(true);
      const output = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      output.sort((a, b) => {
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });

      setFeaturedCourses(output.slice(0, 5));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Container className="mt-5 text-light">
        <Row className="mt-5">
          <Col md={6}>
            <h1>Welcome to Python LMS</h1>
            <p>Enhance your skills with our featured courses.</p>
            <Link to="/lessons">
              <Button variant="primary">Explore Courses</Button>
            </Link>
          </Col>
          <Col md={6}>
            <h2>Featured Courses</h2>
            <ul>
              {featuredCourses.map((course) => (
                <li key={course.id}>{course.title}</li>
              ))}
            </ul>
            {/*
            <Link to="/login">
              <Button className="mr-2" variant="outline-secondary">Log In</Button>
            </Link>
            <Button variant="outline-secondary">Sign Up</Button>
          */}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default HomePage;
