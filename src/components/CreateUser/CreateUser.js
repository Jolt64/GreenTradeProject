import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUser, getUserData, updateUser } from "../../ducks/userReducer";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    let { user_firstName, user_lastName, user_userName, user_email, user_zip, user_img } = this.props.userReducer.userData


    this.state = {
      user_firstName: user_firstName || "",
      user_lastName: user_lastName || "",
      user_userName: user_userName || "",
      user_email: user_email || "",
      password: "",
      user_zip: user_zip || "",
      user_img: user_img || ""
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.userReducer.userData !== prevProps.userReducer.userData){
      this.props.history.push("/user")
    }
  }
  
  inputHandler = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    let { user_firstName, user_lastName, user_userName, user_email, user_zip, user_img } = this.state
    
    let buttonFunction = this.props.createUser;
    let buttonText = "Create";
    if(this.props.userReducer.loggedIn){
        buttonFunction = this.props.updateUser;
        buttonText = "Update";

    }
    
    return (
      <div className="createUser wrapper">
        <p>Create User</p>
        <input
          type="text"
          name="user_firstName"
          value={user_firstName}
          placeholder="First Name "
          onChange={e => this.inputHandler(e)}
        />
        <input
          type="text"
          name="user_lastName"
          value={user_lastName}
          placeholder="Last Name"
          onChange={e => this.inputHandler(e)}
        />
        <input
          type="text"
          name="user_userName"
          value={user_userName}
          placeholder="User Name"
          onChange={e => this.inputHandler(e)}
        />
        <input
          type="text"
          name="user_email"
          value={user_email}
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
        <input
          type="number"
          name="user_zip"
          value={user_zip}
          placeholder="Zip Code"
          onChange={e => this.inputHandler(e)}
        />
        <input
          type="text"
          name="user_img"
          value={user_img}
          placeholder="Image"
          onChange={e => this.inputHandler(e)}
        />
        <button onClick={() => buttonFunction(this.state)}>
          {buttonText}
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps,{ createUser, getUserData, updateUser })(CreateUser);
