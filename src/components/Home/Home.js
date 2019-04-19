import React, { Component } from 'react';
import ItemsList from '../ItemsList/ItemsList';
import { getUserData } from '../../ducks/userReducer';
import { connect } from "react-redux";


class Home extends Component {

  componentDidMount() {
    this.props.getUserData();
    
  }

  render() {
    // console.log(this.props.userReducer.userData.user_id);
    return (
      <div>
        <p>Home</p>
        <ItemsList/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps,{ getUserData })(Home)