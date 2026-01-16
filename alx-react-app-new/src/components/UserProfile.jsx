const UserProfile = (props) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h2 style={{ color: "blue", fontWeight: "bold", fontSize: "4rem" }}>
        {props.name}
      </h2>
      <p style={{ color: "blue", fontWeight: "semi-bold", fontSize: "2rem" }}>
        Age:{" "}
        <span
          style={{
            fontWeight: "bold",
            color: "#1d026d",
            fontSize: "2rem",
          }}
        >
          {props.age}
        </span>
      </p>
      <p
        style={{
          fontWeight: "normal",
          color: "black",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        Bio: {props.bio}
      </p>
    </div>
  );
};

export default UserProfile;
