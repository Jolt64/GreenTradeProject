import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Item extends Component {
  constructor(){
    super()

    this.state = {
      contactInfoShowing: false
    }
  }

  contactInfoRequest = () => {
    this.setState({
      contactInfoShowing: true
    })
  }

  render() {
    const listArr = this.props.itemsReducer.listItemsArr
    const index = listArr.findIndex(i => i.li_id === +this.props.match.params.id)
    const { 
      it_img, 
      li_description, 
      li_timestamp, 
      pc_points_per_action, 
      li_user_contact, 
      li_zip, 
      li_title, 
      li_id,
      li_user
    } = listArr[index];
    
    let contactInfo = 'Please Login For Contact Info'
    let showDeleteButton = ''
    let contactRequestButton = <button onClick={() => this.contactInfoRequest()}>Show Contact Info</button>
    if(this.props.userReducer.loggedIn){
      contactInfo = li_user_contact
      if(this.props.userReducer.userData.user_id === li_user ){
        contactRequestButton = li_user_contact
        showDeleteButton = (
          <div>
            <button>Delete</button>
          </div>
        )
      }
    }
    if(this.state.contactInfoShowing){
      contactRequestButton = (
        <div>
          <p>{contactInfo}</p>
        </div>
      )
    }
    
    return (
      <div className="wrapper Item">
        <div>
          <div>
            <h3>{li_title}</h3>
            <img src={it_img} alt={li_description} width="200px" />
          </div>
          <div>
            <p>{li_description}</p>
            <p>{li_timestamp}</p>
            <p>{pc_points_per_action}</p>
            <p>{contactRequestButton}</p>
            <p>{li_zip}</p>
          </div>
        </div>
        {showDeleteButton}
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Item);
