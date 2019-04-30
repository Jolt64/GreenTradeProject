import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { getUserData, userLogout } from "../../ducks/userReducer";
import { getUsersItemsList } from '../../ducks/itemsReducer';
import SmallUserSvg from './iconmonstr-user-7.svg'
import { Button, MenuDiv, UserImg, SmallUserImg } from '../styledComponents';



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
    this.setState({isMenuShowing: false})
    this.props.getUsersItemsList(user_id).then(res => {
      this.props.history.push('/user-listed-items')
      
    })
  }

  logout = () => {
    this.props.userLogout().then(res => {
      this.setState({isMenuShowing: false})
      this.props.history.push('/')
    })
  }

  render() {
   let resetHam = () => this.setState({isMenuShowing: !this.state.isMenuShowing})
    let loginHolder = () => {
      if (this.props.userReducer.loggedIn === true) {
        return (
          <div>
            <Link onClick={resetHam} to="/user">
             <Button>User</Button>
            </Link>
            <Button onClick={() => this.userItemsList()}>My Posted Items</Button>
            <Button onClick={() => this.logout()}>Logout</Button>
          </div>
        );
      } else {
        return (
          <Link onClick={resetHam} to="/login">
            <Button>Login</Button>
          </Link>
        );
      }
    };

    return (
        <div className="nav wrapper ">
          <MenuDiv className={this.state.isMenuShowing ? "wrapper slideNavOpen" : "wrapper slideNavClosed"}>
          <Link onClick={resetHam} to="/"><Button>Home</Button></Link>
          <Link onClick={resetHam} to="/create-item">
            <Button>List Item</Button>
          </Link>
          {loginHolder()}
          <Link onClick={resetHam} to="/search"><Button className="fullScreenNavRemove">Search</Button></Link>
          </MenuDiv>


          <UserImg>
            <SmallUserImg className="fullScreenNavAdd" src={this.state.smallUserImg} alt="User" ></SmallUserImg>
          </UserImg>
          <div className="fullScreenNavRemove" ></div>
          <Link className="" to="/">
            <span className="mainLogo Trader"><span className="mainLogo Green">Green</span>Trader</span>
          </Link>
          <div>
            <div className="mobileRemove">
              <p className="menuTag" onClick={resetHam}>Menu</p>
            </div>
          </div>
          <div className="fullScreenNavRemove ham">
            <i onClick={resetHam} className="fas fa-bars"></i>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps,{ getUserData, getUsersItemsList, userLogout })(Nav));
