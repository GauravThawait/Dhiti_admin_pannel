import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/utils";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function Allproject() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchProject = () => {
    axios.post(`${BASE_URL}/project/all`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error Fetching Data :", error));

      setLoading(false)
      
};

useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner animation="border" />
        </div>
      );
  }


  const deleteProject = async (slug) => {
    try {
      const response = await fetch(`${BASE_URL}/project/${slug}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchProject();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error in Deleting the blog:", error);
      alert("An error occurred while deleting the blog.");
    }
  };

//   const gotoReadMore = (slug) => {
//     navigate(`/Readproject/${slug}`);
//   };

  const gotoCreateProject = () => {
    navigate("/Project/Createproject");
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin : "20px 5%" }}>
        <h1>All Projects</h1>
        <button className="btn btn-primary" onClick={gotoCreateProject}>Create Project</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap : "20px", margin: "30px 5%" }}>
        {data.map((item, index) => (
          <Card key={index} style={{ width: "18rem", marginBottom: "1rem" }}>
            <Card.Img variant="top" src={item.img_url} />
            <Card.Body>
              <Card.Title>{item.heading}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Category: {item.category}</ListGroup.Item>
              <ListGroup.Item>Region: {item.region}</ListGroup.Item>
              <ListGroup.Item>Completed: {item.completed_status ? "Yes" : "No"}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link as={Link} to={`/project/Readproject/${item.slug}`}>Read More</Card.Link>
              <Card.Link as="button" variant="secondary"
              className="btn btn-danger me-2"   onClick={() => deleteProject(item.slug)}>Delete</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
export default Allproject;
