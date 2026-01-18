function Services() {
  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Inter" }}>
      <h1>Our Services</h1>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0",
          gap: "2rem",
          textDecoration: "none",
          alignItems: "center",
          listStyle: "none",
        }}
      >
        <li>Technology Consulting</li>
        <li>Market Analysis</li>
        <li>Product Development</li>
      </ul>
    </div>
  );
}

export default Services;
