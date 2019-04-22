import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UserListedItems extends Component {


  render() {
    let showingItemsArr = this.props.itemsReducer.userListedItemsArr.map((item, i) => {
        return (
          <Link to={`/item/${item.li_id}`} key={i} >
            <div>
              <div>
                <img src={item.it_img } alt={item.li_description} width="200px" ></img>
              </div>
              <div>
                <p>{item.li_description}</p>
                <p>{item.li_timestamp}</p>
                <p>Points {item.pc_points_per_action}</p>
              </div>
            </div>
          </Link>
        )
      })
    return (
      <div className="wrapper">
        <p>UserListedItems</p>
        {showingItemsArr}
        <Link to="/user">
          <button>Back</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(UserListedItems);
