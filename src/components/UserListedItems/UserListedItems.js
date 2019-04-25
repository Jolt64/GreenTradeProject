import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUsersItemsList } from '../../ducks/itemsReducer'

class UserListedItems extends Component {
  componentDidUpdate(prevProps, prevState) {
    if(this.props.userReducer.userData !== prevProps.userReducer.userData){
    if(this.props.userReducer.userData.user_firstName !== ""){
      const { user_id } = this.props.userReducer.userData
      this.props.getUsersItemsList(user_id)
    }}
  }

  render() {

    let showingItemsArr = this.props.itemsReducer.userListedItemsArr.map((item, i) => {
        return (
          <Link to={`/item/${item.li_id}`} key={i} >
            <div className="listItem wrapper">
              <div>
                <img src={item.it_img } alt={item.li_description} className="itemsListPic" ></img>
              </div>
              <div className="descriptionContainer">
                <p>{item.li_title}</p>
                <p>Points {item.pc_points_per_action}</p>
                <p className="timestamp">{item.li_timestamp}</p>
              </div>
            </div>
          </Link>
        )
      })

    return (
      <div className="wrapper ">
        {showingItemsArr}
        <Link to="/user">
          <button>Back</button>
        </Link>
        <hr color="black" width="360px" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getUsersItemsList })(UserListedItems);
