import Footer from "../components/Footer";

import Navbar from "../components/NavBar";
import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!lastname) newErrors.lastname = "lastname is required.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const FormData = { name, email, lastname, message };

    localStorage.setItem("contactFormData", JSON.stringify(FormData));

    // clear the form inputs
    setName("");
    setLastname("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Navbar pageOnDisplay="hide" />
      <div className="contact-form-container">
        <h1>Contact us</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-div">
            <label htmlFor="Name">Name</label>
            <input
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
          <div className="input-div">
            <label>lastname</label>
            <input
              name="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            {errors.lastname && (
              <p style={{ color: "red" }}>{errors.lastname}</p>
            )}
          </div>
          <div className="input-div">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div className="input-div">
            <label>Message</label>
            <textarea
              type="text-area"
              name="textarea"
              placeholder="whats on your mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                height: "100px",
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
