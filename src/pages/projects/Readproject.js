import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Utils/utils";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const Readproject = () => {
  const { slug } = useParams();
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    axios
      .get(`${BASE_URL}/project/${slug}`)
      .then((response) => {
        setProject(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error Fetching Data :", error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="mx-3 m-3">
      <h3>
        <b>
          <i>Title: </i>
        </b>
        {project.heading}
      </h3>
      {/* <p>By : {project.author}</p> */}
      <p>
        <b>Category: </b>
        {project.category}
      </p>
      <p>
        <b>Reach Household: </b>
        {project.reach_household}
      </p>
      <p>
        <b>Reach Village: </b>
        {project.reach_village}
      </p>
      <p>
        <b>Region: </b>
        {project.region}
      </p>
      <p>
        <b>Completed Status: </b>
        {project.completed_status ? "Completed" : "Ongoing"}
      </p>
      <p>
        <b>Timeline: </b>
        {project.timeline}
      </p>
      <p>
        <b>Budget: </b>
        {project.budget}
      </p>
      <p>
        <b>Partner: </b>
        {project.partner}
      </p>
      <p>
        <b>Time: </b> {new Date(project.created_at).toLocaleDateString()}{" "}
        {new Date(project.created_at).toLocaleTimeString()}
      </p>

      <img
        src={project.img_url}
        alt={project.img_heading}
        style={{ maxWidth: "100%" }}
      ></img>
      <hr />
      <p>
        <b>Description: </b>
        <br />
        {project.description}
      </p>
    </div>
  );
};

export default Readproject;
