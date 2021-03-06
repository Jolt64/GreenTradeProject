import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteItem } from '../../ducks/itemsReducer'
import { Button, P} from '../styledComponents';


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

  deleteItem = () => {
    const listArr = this.props.itemsReducer.listItemsArr
    const index = listArr.findIndex(i => i.li_id === +this.props.match.params.id)
    const { li_id } = this.props.itemsReducer.listItemsArr[index]
    this.props.deleteItem(li_id)
    this.props.history.goBack()
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
        li_user
      } = listArr[index];
    
    
    let contactInfo = 'Please Login For Contact Info'
    let showDeleteButton = ''
    let contactRequestButton = <Button onClick={() => this.contactInfoRequest()}>Contact Info</Button>
    if(this.props.userReducer.loggedIn){
      contactInfo = li_user_contact
      if(this.props.userReducer.userData.user_id === li_user ){
        contactRequestButton = li_user_contact
        showDeleteButton = (
          <div>
            <Button onClick={() => this.deleteItem()}>Delete</Button>
          </div>
        )
      }
    }
    if(this.state.contactInfoShowing){
      contactRequestButton = (
        <div>
          <p> Contact: {contactInfo}</p>
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
            <P>Description: {li_description}</P>
            <P>Posted: {li_timestamp}</P>
            <P>Points: {pc_points_per_action}</P>
            <P>Zip Code: {li_zip}</P>
            <P>{contactRequestButton}</P>
          </div>
        </div>
        {showDeleteButton}
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps, { deleteItem })(Item));
