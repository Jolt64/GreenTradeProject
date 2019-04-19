import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../../ducks/userReducer";

class Login extends Component {
  constructor(){
    super();

    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.userReducer.userData){
      if(this.props.userReducer.userData !== prevProps.userReducer.userData){
        this.props.history.push("/user")
      }
    }
  }

  inputHandler = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  loginHandler = () => {
    this.props.userLogin(this.state)
  }

  render() {
    return (
      <div className="login wrapper">
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
        <button onClick={() => this.loginHandler()}>Login</button>
        <p>Are you new to our site?</p>
        <p>Create a profile here</p> 
        <p>and start finding the things you need.</p>
        <Link to="/create-user"><button>Create Profile</button></Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { userLogin })(Login)