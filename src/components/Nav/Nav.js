import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { getUserData } from "../../ducks/userReducer";
import { getUsersItemsList } from '../../ducks/itemsReducer';

import styled from 'styled-components';
import SmallUserSvg from './iconmonstr-user-7.svg'
import { Button, Trigger } from '../styledComponents';


const MenuDiv = styled.div`
width: 160px;
height: 500px;
position: absolute;
top: 50px;
right: 0px;
justify-content: start;

&:click {
  transform: translate(550, 50) 
}
`;

const SmallUserImg = styled.img`
width: 40px;
border-radius: 50px;
`;

class Nav extends Component {
  constructor(){
    super()

    this.state = {
      smallUserImg: SmallUserSvg,
      isMenuShowing: false
    }  
  }  
  

  componentDidMount() {
    this.props.getUserData().then(res => {
      this.setState({
        smallUserImg: this.props.userReducer.userData.user_img
      })
    })
  }

  userItemsList = () => {
    const { user_id } = this.props.userReducer.userData
    this.props.getUsersItemsList(user_id).then(res => {
      this.props.history.push('/user-listed-items')
      
    })
  }

  render() {
    console.log(this.state.isMenuShowing);
    // let resetHam = onClick={() => this.setState({isMenuShowing: false})}
    let loginHolder = () => {
      if (this.props.userReducer.loggedIn === true) {
        return (
          <Link onClick={() => this.setState({isMenuShowing: false})} to="/user">
            <Button>User</Button>
          </Link>
        );
      } else {
        return (
          <Link onClick={() => this.setState({isMenuShowing: false})} to="/login">
            <Button>Login</Button>
          </Link>
        );
      }
    };

    return (
        <div className="nav wrapper">
          <MenuDiv className="wrapper">
          <Link onClick={() => this.setState({isMenuShowing: false})} to="/"><Button>Home</Button></Link>
          <Link onClick={() => this.setState({isMenuShowing: false})} to="/create-item">
            <Button>List Item</Button>
          </Link>
          {loginHolder()}
          <Button onClick={() => this.userItemsList()}>My Posted Items</Button>
          </MenuDiv>


          <SmallUserImg src={this.state.smallUserImg} alt="User" ></SmallUserImg>
          <Link className="" to="/">
            <span className="mainLogo Trader"><span className="mainLogo Green">Green</span>Trader</span>
          </Link>
          <Trigger>
            <i onClick={() => this.setState({isMenuShowing: true})} class="fas fa-bars"></i>
          </Trigger>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps,{ getUserData, getUsersItemsList })(Nav));
