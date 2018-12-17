import React, { Component } from 'react';
import axios from "axios";

// Import and Create studentApi
import API from "./API/Api";

import logo from './logo.svg';
import './App.css';


// const studentApi = 'http://localhost:3001/api/students';

class App extends Component {
  // Establish initial state
  state = {
    isTeacher: true,
    newStudent: "",
    students: [],
    teachers: []
  };
  // Retrieve student list once the component fully loaded
  componentDidMount() {
    API.get("/students").then(response => {
      // Set student to student array
      this.setState({ students: response.data });
    });

    // Get Teachers
    API.get("/teachers").then(response => {
      // Set student to student array
      this.setState({ teachers: response.data });
    });
    // Using fetch
    /*
    fetch(studentApi)
      .then(response=>{
        return response.json();
      })
      .then(response=>{
        console.log(response);
        this.setState({ students: response });
      });
    */
  }
  // Handle form submit event
  createNewStudent = evt => {
    // Prevent form refresh
    evt.preventDefault();
    const teacher = this.state.isTeacher;
    console.log(teacher);

    if (!teacher) {
      console.log("<<<<<<<<");
      // Post the new student to server
      API.post("/students", {
        student: this.state.newStudent
      }).then(response => {
        // success! Add the new student to our array and clear input
        const students = [...this.state.students, response.data];
        this.setState({ students, newStudent: "" });
        //  this.setState({ students: students, newStudent: '' });
      });
    } else {
      console.log(">>>>>>>>>");
      //Post the new student to server
      API.post("/teachers", {
        teachers: this.state.newStudent
      }).then(response => {
        console.log(response);
        // success! Add the new student to our array and clear input
        const teachers = [...this.state.teachers, response.data];
        this.setState({ teachers, newStudent: "" });
        //  this.setState({ students: students, newStudent: '' });
      });
    }
  };
  // Handle input change
  changeNewChange = evt => {
    this.setState({ newStudent: evt.target.value });
  };
  // Is teacher selected
  handleIsTeacher = evt=>{
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  // Render components to DOM Element
  render() {
    let id = 0;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Students</h1>
        </header>
        <form onSubmit={this.createNewStudent} className="form">
          <label htmlFor="">New student: </label>
          <input
            type="text"
            value={this.state.newStudent}
            onChange={this.changeNewChange}
          />
          <input
            type="checkbox"
            name='isTeacher'
            checked={this.state.isTeacher}
            onChange={this.handleIsTeacher}
          />
        </form>
        {this.state.students.map(student => (
          <div key={id++} className="student">
            <h2>{student}</h2>
          </div>
        ))}
      </div>
    );
  }
}

export default App;