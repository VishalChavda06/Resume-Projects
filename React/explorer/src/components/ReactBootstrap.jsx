

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaArrowRight, FaStar } from 'react-icons/fa';


const ReactBootstrap = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '16px', margin: '32px auto', maxWidth: 900 }}>
      <header style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontWeight: 700, marginBottom: 8 }}>React Bootstrap Showcase</h1>
        <p style={{ color: '#6c757d', fontSize: 18 }}>A modern UI with cards, badges, and more</p>
      </header>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Card style={{ width: '20rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <Card.Img variant="top" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" />
          <Card.Body>
            <Card.Title>
              Mountain Adventure <Badge bg="success" style={{ marginLeft: 8 }}>New</Badge>
            </Card.Title>
            <Card.Text>
              Explore the beauty of nature with our exclusive mountain tours. Perfect for adventure seekers!
            </Card.Text>
            <ListGroup variant="flush" style={{ marginBottom: 12 }}>
              <ListGroup.Item><FaStar color="#ffc107" /> 4.8 Rating</ListGroup.Item>
              <ListGroup.Item>Duration: 5 days</ListGroup.Item>
            </ListGroup>
            <Button variant="primary" style={{ width: '100%' }}>
              Book Now <FaArrowRight style={{ marginLeft: 6 }} />
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">Last updated 2 days ago</Card.Footer>
        </Card>
        <Card style={{ width: '20rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <Card.Img variant="top" src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" />
          <Card.Body>
            <Card.Title>
              City Lights <Badge bg="info" style={{ marginLeft: 8 }}>Featured</Badge>
            </Card.Title>
            <Card.Text>
              Discover the vibrant city life, from fine dining to night adventures. Experience the best the city offers.
            </Card.Text>
            <ListGroup variant="flush" style={{ marginBottom: 12 }}>
              <ListGroup.Item><FaStar color="#ffc107" /> 4.6 Rating</ListGroup.Item>
              <ListGroup.Item>Duration: 3 days</ListGroup.Item>
            </ListGroup>
            <Button variant="dark" style={{ width: '100%' }}>
              Learn More <FaArrowRight style={{ marginLeft: 6 }} />
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">Last updated 5 hours ago</Card.Footer>
        </Card>
      </div>
    </div>
  );
}


export default ReactBootstrap;
