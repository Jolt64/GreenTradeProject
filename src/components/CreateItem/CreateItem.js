import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from 'moment'
import { Link } from "react-router-dom";
import { getCategorys, getCategoryPoints, createNewItem, getItemsList } from "../../ducks/itemsReducer";
import { getUserData } from '../../ducks/userReducer';
import noImg from './no-image-icon-23492.png'

class CreateItem extends Component {
  constructor(props) {
    super(props);


    this.state = {
    // State to send to redux to create new item
      userId: props.userReducer.userData.user_id,
      title: "",
      category: "",
      showingImg: "",
      //this showingImg will be updated to reflect the showing img
      points: "",
      description: "",
      zip: "",
      userContact: "",
      timeStamp: Moment().format("ddd, MMMM Do YYYY"),
      
      // State for this component
      img: noImg,
      //this img will reflect what is in the input field
      catHolder: [],
      pointsHolder: []
    };
  }


  async componentDidMount() {
    this.props.getUserData();
    await this.props.getCategorys();
    this.setState({
      catHolder: this.props.itemsReducer.itemsCategorys.map((cat, i) => {
        return (
          <option key={i} value={cat.pc_item_category}>
            {cat.pc_item_category}
          </option>
        );
      })
    });
    this.setState({
        userId: this.props.userReducer.userData.user_id
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.category !== prevState.category) {
      await this.props.getCategoryPoints(this.state.category);
      this.setState({
        pointsHolder: this.props.itemsReducer.itemsCategoryPoints.map((item, i) => {
          return (
            <option key={i} value={item.pc_points_per_action}>
              {item.pc_points_per_action}
            </option>
          );
        })
      });
    }
  }

  // this resets the showingImg if the img is throwing a err
  addDefaultSrc = (ev) => {
    ev.target.src = noImg
    this.setState({
      showingImg: noImg
    })
  }

  // this updates both the img and showingImg in state
  imgHandler = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      showingImg: value
    });
  };


  inputHandler = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  postNewItem = () => {
      const userId = this.props.userReducer.userData.user_id
      const { title, category, points, showingImg, description, zip, userContact, timeStamp } = this.state
      
      this.props.createNewItem({
        userId, 
        title, 
        category, 
        points, 
        showingImg, 
        description, 
        zip, 
        userContact, 
        timeStamp
      }).then(res => {
        this.props.getItemsList()
        this.props.history.push('/')
      })
      this.setState({
        title: "",
        category: "",
        points: 0,
        img: "",
        description: "",
        zip: 0,
        userContact: "",
      })
  }

  render() {
    
    let pointsDropdownHolder = "";
    if (this.state.category === "") {
    } else if (this.state.category === "Select A Category") {
    } else {
      pointsDropdownHolder = (
        <div>
            <select
                value={this.state.points}
                name="points"
                onChange={e => this.inputHandler(e)}
                >
                <option>Select A Category</option>
                {this.state.pointsHolder}
            </select>
        </div>
      );
    }
    const { img, title, description, zip, userContact } = this.state;

    let displayCreateItem = ""
      if(this.props.userReducer.loggedIn){
        displayCreateItem = (
        <div className="wrapper">
        <select
          value={this.state.category}
          name="category"
          onChange={e => this.inputHandler(e)}
        >
          <option>Select A Category</option>
          {this.state.catHolder}
        </select>
        {pointsDropdownHolder}
        <input
          minLength="3" 
          maxLength="20"
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={e => this.inputHandler(e)}
        />
        <input
          type="text"
          name="img"
          value={img}
          placeholder="Image"
          onChange={e => this.imgHandler(e)}
          onFocus={(e) => e.target.select()}
        />
        <textarea
          rows="7"
          minlength="3" 
          maxlength="4000"
          type="text"
          name="description"
          value={description}
          placeholder="Description"
          onChange={e => this.inputHandler(e)}
          onClick={(e) => e.target.select()}
        />
        <input
          type="number"
          name="zip"
          value={zip}
          placeholder="Zip"
          onChange={e => this.inputHandler(e)}
        />
        <input
          type="text"
          name="userContact"
          value={userContact}
          placeholder="Contact information"
          onChange={e => this.inputHandler(e)}
          onClick={(e) => e.target.select()}
        />
        <p>Contact Information will be displayed to users</p>
        <button onClick={() => this.postNewItem()}>Post Item</button>

      </div>
        )
    } else {
      displayCreateItem = (
        <div className="wrapper">
          <h3>Pleast login to post Items</h3>
          <Link to="/login"><button>Login Now</button></Link>
        </div>
      )
    }
    return (
      <div className="wrapper listItemPage">
        <img onError={this.addDefaultSrc} src={this.state.img} alt="" className="itemsListPic" ></img>
        {displayCreateItem}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps,{ getCategorys, getCategoryPoints, createNewItem, getUserData, getItemsList })(CreateItem);
