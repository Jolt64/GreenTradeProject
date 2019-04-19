import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class DeleteUser extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  inputHandler = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="deleteUser wrapper">
        <h1>Danger!</h1>
        <h2>this can't be undone</h2>
        <h3>Login</h3>
          <input
          type="text"
          name="email"
          value={this.state.email}
          placeholder="Email"
          onChange={e => this.inputHandler(e)}
        />
        <input
          type="text"
          name="password"
          value={this.state.password}
          placeholder="Password"
          onChange={e => this.inputHandler(e)}
        />
        <p>Sorry to see you go</p>
        <p>we will miss you!</p>
        <Link to="/user">
          <button>Cancel</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  {}
)(DeleteUser);
