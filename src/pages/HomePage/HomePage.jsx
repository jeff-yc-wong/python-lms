import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const featuredCourses = [
      { id: 1, title: 'Crazy Shapes' },
      { id: 2, title: '1 Player Pong' },
      { id: 3, title: 'Mini Game' },
    ];
  
    return (
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <h1>Welcome to Python LMS</h1>
            <p>Enhance your skills with our featured courses.</p>
            <Button variant="primary">Explore Courses</Button>
          </Col>
          <Col md={6}>
            <h2>Featured Courses</h2>
            <ul>
              {featuredCourses.map(course => (
                <li key={course.id}>{course.title}</li>
              ))}
            </ul>
            <Button className="mr-2" variant="outline-secondary">Log In</Button>
            <Button variant="outline-secondary">Sign Up</Button>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default HomePage;