import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserData } from "../../ducks/userReducer";

class Nav extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    let loginHolder = () => {
      if (this.props.userReducer.loggedIn === true) {
        return (
          <Link to="/user">
            <span>User</span>
          </Link>
        );
      } else {
        return (
          <Link to="/login">
            <span>Login</span>
          </Link>
        );
      }
    };

    return (
        <div className="nav wrapper">
          <Link to="/create-item">
            <span>List Item</span>
          </Link>
          <Link to="/">
            <span>Home</span>
          </Link>
          {loginHolder()}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  { getUserData }
)(Nav);
