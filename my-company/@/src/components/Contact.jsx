import { useState } from "react";

function Contact() {
  const [hover, setHover] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Inter",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <h1>Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
          backgroundColor: "#ededed",
          padding: "3rem 2rem",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          style={{
            display: "block",
            margin: "10px 0",
            width: "50%",
            padding: "1rem 0.5rem",
            border: "none",
            borderRadius: "15px",
            fontFamily: "Inter",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          style={{
            display: "block",
            margin: "10px 0",
            width: "50%",
            padding: "1rem 0.5rem",
            border: "none",
            borderRadius: "15px",
            fontFamily: "Inter",
          }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          value={formData.message}
          onChange={handleChange}
          rows="7"
          cols="43"
          style={{
            display: "block",
            margin: "10px 0",
            maxWidth: "50%",
            padding: "1rem 0.5rem",
            border: "none",
            borderRadius: "15px",
            fontFamily: "Inter",
          }}
        />
        <button
          type="submit"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            padding: "1rem 2rem",
            borderRadius: "20px",
            color: hover ? "#000" : "#fff",
            backgroundColor: hover ? "#b7b7b7" : "#000",
            fontFamily: "Inter",
            fontSize: "1rem",
            border: "none",
            marginTop: "1rem",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
