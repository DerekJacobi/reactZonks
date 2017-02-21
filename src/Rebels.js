import React from 'react';
import logo from './logo.svg';
import './App.css';

const rebels = [
  { firstName: "chris" },
  { firstName: "mike" },
  { firstName: "bryan" }


]

class RebelsList extends React.Component {
  render() {
    var createRebel = function(rebel, index){
      return (
        <li key={ index }>
        {rebel.firstName}
        </li>
      );
    };
    return <ul>{ rebels.map(createRebel) }</ul>;
  }
}

class Rebels extends React.Component {

  // mixins: [ReactFireMixin]

  // getInitialState = function() {
  //   return {
  //     rebels: []
  //   };
  // }
  //
  // componentWillMount = function() {
  //   var firebaseRef = firebase.database().ref('rebels');
  // }
  //
  // onChange =function(e) {
  //   this.setState({text: e.target.value});
  // }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
        <div><RebelsList rebels= {this.props.rebels} /></div>
        </p>
      </div>
    );
  }

}

export default Rebels;
