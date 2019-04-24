import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { getUserData } from '../../ducks/userReducer';
import { connect } from "react-redux";

class ItemsList extends Component {
  constructor(){
    super()

    this.state = {
      itemsListArr: []
    }
  }

  componentDidMount(){
    this.setState({
      itemsListArr: this.props.itemsReducer.listItemsArr
    })
  }

  render() {
    let showingItemsArr = this.props.itemsReducer.listItemsArr.map((item, i) => {
      return (
        <Link to={`/item/${item.li_id}`} key={i} >
          <div className="listItem wrapper">
            <div>
              <img src={item.it_img } alt={item.li_title} className="itemsListPic" ></img>
            </div>
            <div>
              <p>{item.li_title}</p>
              <p>Points {item.pc_points_per_action}</p>
              <p className="timestamp">{item.li_timestamp}</p>
            </div>
          </div>
        </Link>
      )
    })
    // console.log(showingItemsArr);
    // console.log(this.props.itemsReducer.listItemsArr[0]);
    
    return (
      <div className="wrapper">
        {showingItemsArr}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps,{ getUserData })(ItemsList)