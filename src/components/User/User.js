import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import user from "./user.svg";
import { connect } from "react-redux";
import { 
  createUser, 
  getUserData, 
  userLogout
 } from "../../ducks/userReducer";
import { getUsersItemsList } from '../../ducks/itemsReducer'


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

  userItemsList = () => {
    const { user_id } = this.props.userReducer.userData
    this.props.getUsersItemsList(user_id).then(res => {
      this.props.history.push('/user-listed-items')
    })
  }


  render() {
    console.log(this.props.userReducer.userData);
    
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
          <button onClick={() => this.userItemsList()}>My Posted Items</button>
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

export default connect(mapStateToProps,{ 
  createUser, 
  getUserData, 
  userLogout, 
  getUsersItemsList
 })(User)