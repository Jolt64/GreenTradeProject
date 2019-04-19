import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import user from "./user.svg";
import { connect } from "react-redux";
import { createUser, getUserData, userLogout } from "../../ducks/userReducer";


class User extends Component {
  constructor() {
    super();

    this.state = {
      user_firstName: "First Name",
      user_lastName: "Last Name",
      user_userName: "User Name",
      user_email: "Email",
      user_zip: "Zip Code",
      user_img: user
    };
  }

  componentDidMount() {
    this.props.getUserData();
    
  }

  logout = () => {
    this.props.userLogout().then(res => {
      this.props.history.push('/')
    })
  }


  render() {
    let destructuringHolder = ""
    if(this.props.userReducer.loggedIn){
        destructuringHolder = this.props.userReducer.userData
    } else {
        destructuringHolder = this.state
    }
    const { user_firstName, user_lastName, user_userName, user_email, user_zip, user_img } = destructuringHolder
    return (
      <div className="user wrapper">
        <img src={user_img} alt="user" width="200"></img>
          <h2>{user_firstName}  {user_lastName}</h2>
          <h3>As {user_userName}</h3>
          <p>Email: {user_email}</p>
          <p>Zip: {user_zip}</p>
          <button onClick={() => this.logout()}>Logout</button>
          <h3>Rep</h3>
          <Link to="/create-user"><button>Update</button></Link>
          <Link to="/delete-user"><button>Delete Account</button></Link>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps,{ createUser, getUserData, userLogout })(User)