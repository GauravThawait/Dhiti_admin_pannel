import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { storage } from "../../config/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/utils";

function Createproject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    heading: "",
    category: "",
    imageDescription: "",
    description: "",
    image: null, // To store the image file
    reach_household : "",
    reach_village: "",
    region: "",
    completed_status:"",
    timeline:"",
    budget: "",
    partner:"",
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

    const storageRef = ref(storage, `website/project/${formData.image.name}`);
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
          postproject();
        });
      }
    );
  };

  const postproject = async () => {
    const data_to_send = {
      heading: formData.heading,
      category: formData.category,
      img_url: image_url,
    //   image_description: formData.imageDescription,
    //   author: formData.author,
      description: formData.description,
      reach_household: formData.reach_household,
      reach_village : formData.reach_village,
      region: formData.region,
      completed_status: formData.completed_status === "completed",
      budget: formData.budget,
      partner: formData.partner,
    timeline: formData.timeline

    };

    fetch(`${BASE_URL}/project/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_send),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("project added successfully!");
        navigate("/project");
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
    imageDescription: "",
    description: "",
    image: null, // To store the image file
    reach_household : "",
    reach_village: "",
    region: "",
    completed_status:"",
    timeline:"",
    budget: "",
    partner:"",
    });
  };

  return (
    <div className="mx-5 m-3">
      <div className="mb-3">
        <h1>Create Project</h1>
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
            <option value="education">Education</option>
            <option value="youth-welfare">Youth Welfare</option>
            <option value="environment-one-health"> Environment & One Health</option>
            <option value="health-campaign">Health and Campaign</option>
        
          




          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Reach Household</Form.Label>
          <Form.Control
            name="reach_household"
            type="text"
            placeholder="Reach Household"
            value={formData.reach_household}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Reach Village</Form.Label>
          <Form.Control
            name="reach_village"
            type="text"
            placeholder="Reach Village"
            value={formData.reach_village}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Region</Form.Label>
          <Form.Control
            name="region"
            type="text"
            placeholder="Region"
            value={formData.region}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
          <Form.Label>Project Status</Form.Label>
          <Form.Control
            as="select"
            name="completed_status"
            value={formData.completed_status}
            onChange={handleInputChange}
          >
            <option value="">----Select----</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Timeline</Form.Label>
          <Form.Control
            name="timeline"
            type="text"
            placeholder="Timeline"
            value={formData.timeline}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Project Cover Image : </Form.Label>
          <Form.Control
            name="image"
            type="file"
            placeholder="heading"
            accept="image/jpeg, image/png"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Budget</Form.Label>
          <Form.Control
            name="budget"
            type="text"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Partners</Form.Label>
          <Form.Control
            name="partner"
            type="text"
            placeholder="Partner"
            value={formData.partner}
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
              onClick={ ()=>{
                navigate("/projects")
              } }
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

export default Createproject;
