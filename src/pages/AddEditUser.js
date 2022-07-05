import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { storage } from "../firebase";

const initialState = {
  name: "",
  email: "",
  info: "",
  contact: "",
};
const AddEditUser = () => {
  const [data, setData] = useState(initialState);
  const { name, email, info, contact } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name is Required";
    }
    if (!email) {
      errors.email = "Email is Required";
    }
    if (!info) {
      errors.info = "Info is Required";
    }
    if (!contact) {
      errors.contact = "Contact is Required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // checking inputs
    let errors = validate();
    if (Object.keys(errors).length) {
      return setErrors(errors);
    }
  };

  return (
    <div>
      <Grid centered verticalAlign="middle" columns="3" style={{ height: "80vh" }}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <div>
              {isSubmit ? (
                <Loader active inline="centered" size="huge" />
              ) : (
                <>
                  <h2>Add User</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Input
                      label="Name"
                      error={errors.name ? { content: errors.name } : null}
                      placeHolder="Enter Name"
                      name="name"
                      onChange={handleChange}
                      value={name}
                      autoFocus
                    />
                    <Form.Input
                      type="email"
                      label="Email"
                      error={errors.email ? { content: errors.email } : null}
                      placeHolder="Enter Email"
                      name="email"
                      onChange={handleChange}
                      value={email}
                    />
                    <Form.TextArea
                      label="Info"
                      error={errors.info ? { content: errors.info } : null}
                      placeHolder="Enter Info"
                      name="info"
                      onChange={handleChange}
                      value={info}
                    />
                    <Form.Input
                      label="Contact"
                      error={errors.contact ? { content: errors.contact } : null}
                      placeHolder="Enter Contact"
                      name="contact"
                      onChange={handleChange}
                      value={contact}
                    />
                    <Form.Input
                      label="Upload"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button primary type="submit">
                      Submit
                    </Button>
                  </Form>
                </>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AddEditUser;
