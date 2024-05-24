import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Utils/utils";

const ReadBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);  // Change to null for initial state as we are dealing with an object

  useEffect(() => {
    fetch(`${BASE_URL}/blog/all/${slug}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBlog(data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, [slug]);

  // Handling rendering only when blog data is available
  if (!blog) {
    return <div>Loading...</div>;  // Consider adding a loader or a message indicating the data is loading
  }

  return (
    <div className="mx-3 m-3" style={{ margin: "0 5%" }}>
      <h3><b><i>Title: </i></b>{blog.heading}</h3>
      <p><b>By: </b> {blog.author}</p>
      <p><b>Category: </b>{blog.category}</p>
      <p><b>Time: </b> {new Date(blog.created_at).toLocaleDateString()} {new Date(blog.created_at).toLocaleTimeString()}</p> 
      <img src={blog.img_url} alt={blog.heading || 'Blog Image'} style={{ maxWidth: '100%' }} />
      <hr />
      <p style={{ whiteSpace: "pre-wrap" }}><b>Description :</b><br />{blog.description}</p>
    </div>
  );
};

export default ReadBlog;
