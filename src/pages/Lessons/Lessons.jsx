import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const LessonsPage = () => {
  const lessons = [
    { id: 1, title: 'Lesson 1', description: 'Introduction to Python' },
    { id: 2, title: 'Lesson 2', description: 'Control and Flow' },
    // Add more lessons as needed
  ];

  return (
    <div className="container mt-5">
      <h1 className="title">Lessons Page</h1>
      <Row xs={1} md={2} lg={3} xl={4}>
        {lessons.map(lesson => (
          <Col key={lesson.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{lesson.title}</Card.Title>
                <Card.Text>{lesson.description}</Card.Text>
                <Link to='/modules'>
                  <Button variant="primary">Go to Module List</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default LessonsPage;
