import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { storage } from "../../config/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/utils";


function Createblog() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    heading: "",
    category: "",
    author: "",
    imageDescription: "",
    description: "",
    image: null, // To store the image file
  });

  let image_url = "";

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please select an image.");
      return;
    }

    const storageRef = ref(storage, `website/blogs/${formData.image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, formData.image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // You can use snapshot to show upload progress
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed", error);
        alert("Error uploading file.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          image_url = downloadURL;
          postblog();
        });
      }
    );
  };

  const postblog = async () => {
    const data_to_send = {
      heading: formData.heading,
      category: formData.category,
      img_url: image_url,
      image_description : formData.imageDescription,
      author: formData.author,
      description: formData.description,
    };

    fetch(`${BASE_URL}/blog/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_send),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Blog added successfully!");
        navigate('/blogs');
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error posting blog data.");
      });
  };

  const clearField = () => {
    setFormData({
      heading: "",
      category: "",
      author: "",
      imageDescription: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="mx-5 m-3"> 
      <div className="mb-3">
        <h1>Create Blog</h1>
      </div>
      <Form onChange={handleInputChange} noValidate>
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Heading</Form.Label>
          <Form.Control
            name="heading"
            type="text"
            placeholder="heading"
            value={formData.heading}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
          <Form.Label>Project Status</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">----Select----</option>
            <option value="story">STORY</option>
            <option value="feature">FOOD</option>
            <option value="news">NEWS</option>
          
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Author</Form.Label>
          <Form.Control
          
            name="author"
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Blog Cover Image : </Form.Label>
          <Form.Control
            name="image"
            type="file"
            placeholder="heading"
            accept="image/jpeg, image/png"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Cover Image Description </Form.Label>
          <Form.Control
            name="imageDescription"
            type="description"
            placeholder="Image Description"
            value={formData.imageDescription}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={15}
            value={formData.description}
            onChange={handleInputChange}
          />
          <div className="d-flex justify-content-end mb-5 mt-3">
            <button
              variant="secondary"
              className="btn btn-danger me-2"
              type="cancel"
            >
              Cancel
            </button>
            <button
              variant="warning"
              className=" btn btn-primary me-2"
              type="reset"
              onClick={clearField}
            >
              Reset
            </button>
            <button
              variant="success"
              className="btn btn-success me-2"
              type="save"
              onClick={handleSubmit}
            >
                Save
            </button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Createblog;
