import React, { Component } from 'react';
import './App_reset.css'
import './App.css';
import { Switch, Route, HashRouter, Link } from 'react-router-dom';
import { getItemsList } from './ducks/itemsReducer';
import { connect } from "react-redux";


import Home from './components/Home/Home';
import Item from './components/Item/Item';
import User from './components/User/User';
import Nav from './components/Nav/Nav';
import CreateUser from './components/CreateUser/CreateUser';
import Login from './components/Login/Login';
import DeleteUser from './components/DeleteUser/DeleteUser';
import CreateItem from './components/CreateItem/CreateItem';


class App extends Component {

  componentDidMount(){
    this.props.getItemsList()
  }

  render() {
    return (
      <HashRouter>
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/Item/:id" component={Item}></Route>
          <Route path="/create-user" component={CreateUser}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/delete-user" component={DeleteUser}></Route>
          <Route path="/create-item" component={CreateItem}></Route>
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    );
  }
}

function NotFound() {
  return(
    <div>
        <h1>404 Page Not Found</h1>
        <Link to="/">
          <button>Return Home</button>
        </Link>
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps,{ getItemsList })(App)
