import React, { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import { storage } from "../../config/Firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/utils";

function Allblog() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    fetch(`${BASE_URL}/blog/getall`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error Fetching Data :", error));
  };

  const deleteBlog = async (slug) => {
    try {
      const response = await fetch(`${BASE_URL}/blog/${slug}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Or any other notification mechanism you prefer
        fetchBlogs(); // Refresh the list of blogs
      } else {
        alert(data.message); // Handle errors, e.g., blog not found
      }
    } catch (error) {
      console.error("Error in Deleting the blog:", error);
      alert("An error occurred while deleting the blog.");
    }
  };

  const gotoReadMore = (slug) => {
    navigate(`/Readblog/${slug}`);
  };

  const gotoCreateBlog = () => {
    navigate("/Createblog");
  };

  return (
    <div className="mx-5">
      <div className="mx-3 mb-3">
        <h1>All Blogs</h1>
        <button className="btn btn-primary" onClick={gotoCreateBlog}>
          Create Blog
        </button>
        {/* <button className="btn btn-primary" onClick={gotoFormField}>Form Field</button> */}
        {/* <Link className="btn btn-primary" to={'/Createform'}>Form Field</Link> */}
      </div>

      <div>
        {data.map((item, index) => (
          <Card key={index} className="mx-3 mb-5 ">
            {/* Uncomment and replace 'holder.js/100px180?text=Image cap' with `item.image` if your items include images */}
            {/* <Card.Img variant="top" src={item.image || 'default-image-url'} /> */}
            <Card.Body>
              <Card.Title>{item.heading}</Card.Title>
              <Card.Text>Category : {item.category}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>By : {item.author}</ListGroup.Item>
              <ListGroup.Item>Time : {item.created_at}</ListGroup.Item>
              {/* <ListGroup.Item>{item.imageDescription}</ListGroup.Item> */}
            </ListGroup>
            <Card.Body>
              <button
                className="btn btn-danger me-2"
                onClick={() => deleteBlog(item.slug)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => gotoReadMore(item.slug)}
              >
                Read More
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Allblog;
