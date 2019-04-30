import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import user from "./user.svg";
import { connect } from "react-redux";
import { 
  createUser, 
  getUserData, 
  userLogout
 } from "../../ducks/userReducer";
import { Button, P, H2, H3 } from '../styledComponents';



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
      console.log(this.props);
    })
  }


  render() {
    console.log(this.props.userReducer);
    
    let points = 10
    let destructuringHolder = this.state
    if(this.props.userReducer.loggedIn === true){
        destructuringHolder = this.props.userReducer.userData
    } else {
        destructuringHolder = this.state
    }
    const { user_firstName, user_lastName, user_userName, user_email, user_zip, user_img } = destructuringHolder
    return (
      <div className="user wrapper">
        <img src={user_img} alt="user" width="200"></img>
          <H2>{user_firstName}  {user_lastName}</H2>
          <H3>Username: {user_userName}</H3>
          <P>Email: {user_email}</P>
          <P>Zip: {user_zip}</P>
          <P>My Points: {points}</P>
          <Button onClick={() => this.logout()}>Logout</Button>
          <Link to="/create-user"><Button>Update</Button></Link>
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
 })(User)