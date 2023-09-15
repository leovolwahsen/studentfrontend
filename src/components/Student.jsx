import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);

  //Styling
  const paperStyle = { padding: "60px 50px", width: 600, margin: "10px auto" };
  const labelStyle = { marginTop: "10px" };
  const buttonStyle = { marginTop: "2rem", marginLeft: "12rem" };

  //Button click handling
  const handleClick = (event) => {
    event.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8081/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student added!");
    });
  };

  useEffect(() => {
    fetch("http://localhost:8081/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Box component="form" noValidate autoComplete="off">
      <Paper elevation={1} style={paperStyle}>
        <h1
          style={{
            color: "#1876D2",
            marginBottom: "1rem",
            marginTop: "-1rem",
            marginLeft: "9rem",
          }}
        >
          <u>Create Student</u>
        </h1>
        <TextField
          id="outlined-basic"
          label="Student Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Student Address"
          variant="outlined"
          fullWidth
          style={labelStyle}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          style={buttonStyle}
          onClick={handleClick}
        >
          Submit
        </Button>
      </Paper>
      <br />
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ marginLeft: "4.8rem", marginBottom: "2rem",  color: "#1876D2" }}>
          {" "}
          <u>Database of Students:</u>
        </h1>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={student.id}
          >
            Id: {student.id}
            <br />
            Name: {student.name}
            <br />
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}
