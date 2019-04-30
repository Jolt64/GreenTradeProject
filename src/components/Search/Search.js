import React, { Component } from "react";
import ItemsList from "../ItemsList/ItemsList";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { P, H3 } from "../styledComponents";
import { searchItemsByTitle, getItemsList, getCategorys, searchCategory } from '../../ducks/itemsReducer';
import { getUserData } from '../../ducks/userReducer';


class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchHolder: "",
      category: [],
      catHolder: [],
    }
  }

  async componentDidMount() {
    this.props.getUserData();
    await this.props.getCategorys();
    this.setState({
      catHolder: this.props.itemsReducer.itemsCategorys.map((cat, i) => {
        return (
          <P key={i} value={cat.pc_item_category} onClick={e => this.props.searchCategory(cat.pc_item_category)}>
            {cat.pc_item_category}
          </P>
        );
      })
    });
    this.setState({
        userId: this.props.userReducer.userData.user_id
    })
  }



  inputHandler = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
    if(value === ''){
      this.props.getItemsList();
    } else {
      this.props.searchItemsByTitle(value)
    }
  };


  render() {
    if(window.innerWidth >= 600){
      if(this.props.history.location.pathname === '/search'){
        this.props.history.push('/')
      }
    }
    
    const { searchHolder } = this.state
    return (
      <div className="wrapper">
        <div className="wrapper search">
        <input
          maxLength="20"
          type="text"
          name="searchHolder"
          value={searchHolder}
          placeholder="Search by Title"
          onChange={e => this.inputHandler(e)}
        />
        <div className="mobileRemove wrapper">
          <H3>Search by Category</H3>
          {this.state.catHolder}
        </div>
          <div className=" fullScreenNavRemove">
            <ItemsList />
          </div>
            <div className=" fullScreenNavAdd mobileRemove wrapper">
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps, { 
  searchItemsByTitle, 
  getItemsList, 
  getUserData, 
  getCategorys,
  searchCategory
 })(Search));
