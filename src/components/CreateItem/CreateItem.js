import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from 'moment'
// import { Link } from "react-router-dom";
import { getCategorys, getCategoryPoints, createNewItem } from "../../ducks/itemsReducer";
import { getUserData } from '../../ducks/userReducer'

class CreateItem extends Component {
  constructor(props) {
    super(props);
    // const { user_id } = this.props.userReducer.userData;
    // console.log(user_id);


    this.state = {
    // State to send to redux to create new item
      userId: props.userReducer.userData.user_id,
      title: "",
      category: "",
      points: 0,
      img: "",
      description: "",
      zip: 0,
      userContact: "",
      timeStamp: Moment().format("dddd, MMMM Do YYYY"),

    // State for this component
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

  inputHandler = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  postNewItem = () => {
      const userId = this.props.userReducer.userData.user_id
      const { title, category, points, img, description, zip, userContact, timeStamp } = this.state
      console.log("userId", userId);
      
      this.props.createNewItem({userId, title, category, points, img, description, zip, userContact, timeStamp});
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
    // console.log(this.state.userId);
    
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
    return (
      <div className="listItem wrapper">
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
          onChange={e => this.inputHandler(e)}
        />
        <input
          type="text"
          name="description"
          value={description}
          placeholder="Description"
          onChange={e => this.inputHandler(e)}
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
        />
        <p>Contact Information will be displayed to users</p>
        <button onClick={() => this.postNewItem()}>Post Item</button>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps,{ getCategorys, getCategoryPoints, createNewItem, getUserData })(CreateItem);
