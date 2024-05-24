import React, { useState } from "react";
import { BASE_URL, LOCAL } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";

function DynamicInputForm() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [inputs, setInputs] = useState([""]);

  const navigate = useNavigate();

  console.log(inputs);
  const handleChange = (index, event) => {
    const values = [...inputs];
    values[index] = event.target.value;
    setInputs(values);
  };

  const handleAddInput = () => {
    const values = [...inputs];
    values.push("");
    setInputs(values);
  };

  const handleRemoveInput = (index) => {
    const values = [...inputs];
    values.splice(index, 1);
    setInputs(values);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(inputs);

    console.log({
      heading, 
      description,
      questions : inputs
    });
    const result = await fetch(`${LOCAL}form/create`, {
      method : 'POST',
      headers : {
        "Content-Type" : 'application/json',

      } ,
      body : JSON.stringify({
        heading, 
        description,
        questions : inputs
      })
    });

      alert("Blog added successfully!");
      navigate('/');

    const res = await result.json();
    console.log(res);


  };

  return (
    <form onSubmit={handleSubmit} className="mx-5 mt-3" style = {{gap  : 8}}>
      <h1 className="mb-3">Form Fields</h1>
      <div className="form-floating mb-3">
      <input
        className="form-control"
        type="text"
        placeholder="Add Heading"
        value={heading}
        onChange={(event) => setHeading(event.target.value)}
        style = {{marginBottom  : 10}}
      />
      <label for = "floatingInput">Add Heading</label>
      </div>
      

      <div className="form-floating mb-3">
      <input
        className="form-control"
        type="text"
        placeholder="Add Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        style = {{marginBottom  : 10}}

      />
      <label for = "floatingInput">Add Description</label>
      </div>
      {inputs.map((input, index) => (
        <div key={index} className="mb-4 form-floating" style = {{flexDirection : 'row', display :'flex' , alignItems : 'center', gap  : '5%', marginTop : 50}}>
          <textarea
            className="form-control"
            type="text"
            value={input.value}
            onChange={(event) => handleChange(index, event)}
          />
          <label for="floatingInput">Question</label>
          <button
            type="button"
            onClick={() => handleRemoveInput(index)}
            className="btn btn-danger"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 mb-4">
        <button
          type="button"
          onClick={handleAddInput}
          className=" btn btn-secondary"
          style={{ marginRight: 10 }}
        >
          Add Input
        </button>
        <button type="submit" className="btn btn-primary ">
          Submit
        </button>
      </div>
    </form>
  );
}

export default DynamicInputForm;

// const Createform = () => {
//   return (
//     <div className='container mx-5 mt-3'>
//         <h1>Create Form</h1>
//         <button className='btn btn-primary'>Add Field</button>
//     </div>
//   )
// }

// export default Createform
