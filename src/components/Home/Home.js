import React, { Component } from 'react';
import ItemsList from '../ItemsList/ItemsList';
import { getUserData } from '../../ducks/userReducer';
import { getItemsList } from '../../ducks/itemsReducer';
import { connect } from "react-redux";
import Search from "../Search/Search";
import { H3 } from "../styledComponents";


class Home extends Component {

  componentDidMount() {
    this.props.getUserData();
    this.props.getItemsList();
  }

  render() {
    // console.log(this.props.userReducer.userData.user_id);
    return (
      <div className="flexRow homepage">
        <div className="mobileRemove wrapper">
          <H3>List Items</H3>
          <Search/>
        </div>
        <div className="homeStartPosition">
          <ItemsList/>
        </div>
        <div className="mobileRemove wrapper">
          <H3>Completed Projects</H3>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps,{ getUserData, getItemsList })(Home)