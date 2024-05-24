import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn based on token existence
  }, []); // Empty dependency array to run only once on component mount


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/Login"); // Redirect to Login page after logout
  };
  return (
    <>
    
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Dhiti Admin</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Blogs">Blogs</Nav.Link>
            <Nav.Link href="/Project">Projects</Nav.Link>
            <Nav.Link href="/Partner">Partners</Nav.Link>

          </Nav>
          <Nav>
          {isLoggedIn ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link href="/Login">Login</Nav.Link>
              )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;