import React, { Component } from 'react';
import axios from "axios";

import logo from './logo.svg';
import './App.css';

// Create studentApi
const studentApi = 'http://localhost:3001/api/students';

class App extends Component {
  // Establish initial state
  state = {
    newStudent: '',
    students: []
  };
  // Retrieve student list once the component fully loaded
  componentDidMount() {
    axios.get(studentApi).then(response => {
      // Set student to student array
      this.setState({ students: response.data });
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
  createNewStudent = (evt)=>{
    // Prevent form refresh
    evt.preventDefault();

    // Post the new student to server
    axios.post(studentApi,{student: this.state.newStudent})
         .then(response=>{
           // success! Add the new student to our array and clear input
           const students=[...this.state.students, response.data];
           this.setState({students, newStudent: ''});
          //  this.setState({ students: students, newStudent: '' });
         })
  }
  // Handle input change
  changeNewChange = (evt) => {
    this.setState({newStudent: evt.target.value});
  }
  // Render components to DOM Element
  render() {
    let id=0;
    return <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Students</h1>
        </header>
        <form onSubmit={this.createNewStudent} className="form">
          <label htmlFor="">New student: </label>
          <input type="text" value={this.state.newStudent} onChange={this.changeNewChange} />
        </form>
        {this.state.students.map(student => (
          <div key={id++} className="student">
            <h2>{student}</h2>
          </div>
          ))
        }
      </div>;
  }
}

export default App;
