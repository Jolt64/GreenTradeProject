import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Item extends Component {
  render() {
    const listArr = this.props.itemsReducer.listItemsArr
    const index = listArr.findIndex(i => i.li_id === +this.props.match.params.id)
    const { it_img, li_description, li_timestamp, li_points } = listArr[index];
    
    return (
      <div className="wrapper">
        <div>
          <div>
            <img src={it_img} alt={li_description} width="200px" />
          </div>
          <div>
            <p>{li_description}</p>
            <p>{li_timestamp}</p>
            <p>{li_points}</p>
          </div>
        </div>
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Item);
