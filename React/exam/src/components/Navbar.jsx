import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../contexts/AuthContext'
import { 
    HouseDoor, 
    People, 
    PersonPlus, 
    ListUl, 
    InfoCircle,
    Gear,
    BoxArrowRight,
    Person
} from 'react-bootstrap-icons';

const NavbarComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

      const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

    return (
        <>
            <Navbar expand="lg" className="bg-primary" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold">
                        <People className="me-2" size={24} />
                        Student Management System
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {currentUser && (
                            <Nav className="me-auto">
                                <Nav.Link 
                                    as={Link} 
                                    to="/" 
                                    className={location.pathname === '/' ? 'active' : ''}
                                >
                                    <HouseDoor className="me-1" size={16} />
                                    Home
                                </Nav.Link>
                                <Nav.Link 
                                    as={Link} 
                                    to="/students" 
                                    className={location.pathname === '/students' ? 'active' : ''}
                                >
                                    <ListUl className="me-1" size={16} />
                                    All Students
                                </Nav.Link>
                                <Nav.Link 
                                    as={Link} 
                                    to="/add-student" 
                                    className={location.pathname === '/add-student' ? 'active' : ''}
                                >
                                    <PersonPlus className="me-1" size={16} />
                                    Add Student
                                </Nav.Link>
                            </Nav>
                        )}
                        <Nav>
                            {currentUser ? (
                                <NavDropdown 
                                    title={
                                        <>
                                            <Person className="me-1" size={16} />
                                            {currentUser.email}
                                        </>
                                    } 
                                    id="user-nav-dropdown"
                                    align="end"
                                >
                                    <NavDropdown.Item as={Link} to="/about">
                                        <InfoCircle className="me-2" size={16} />
                                        About
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        <BoxArrowRight className="me-2" size={16} />
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav>
                                    <Nav.Link as={Link} to="/login">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/register">
                                        Register
                                    </Nav.Link>
                                </Nav>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent