import React from 'react';
import './App.css';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCT6SEpz92GA_wZURkULh5kd9m72OqpEF4",
  authDomain: "rebelzonks-67645.firebaseapp.com",
  databaseURL: "https://rebelzonks-67645.firebaseio.com",
  storageBucket: "rebelzonks-67645.appspot.com",
  messagingSenderId: "3123715510"
};

firebase.initializeApp(config);

const fb = firebase.database();

class RebelsList extends React.Component {
  render() {
    var createRebel = function(rebel, index){
      return (
        <li key={ index } className="zonk-li">
          <div className="panel panel-default rebel-div">
            <div className="panel-heading">
              <h3 className="panel-title">{rebel.firstname} {rebel.lastname} </h3>
              <h4>{rebel.zonks[0]}</h4>
            </div>
          </div>
      </li>
      );
    };
    return <ul>{ this.props.rebels.map(createRebel) }</ul>;
  }
}

class buildRebel {
  constructor(snapshot) {
    this.firstname = snapshot.firstname;
    this.lastname = snapshot.lastname;
    this.zonks = this.zonkList(snapshot.zonks);
  }

  zonkList(zonks){
    console.log(zonks);
  }
}

var Rebels = React.createClass ({

  getInitialState: function() {
    return {
      rebels: []
    };
  },

  componentWillMount: function() {
    this.rebels = fb.ref('rebels');
    var rebels = [];
    this.rebels.on('value', function(dataSnapshot) {
    dataSnapshot.forEach(function(childSnapshot) {
      var rebel = new buildRebel(childSnapshot.val());
      rebels.push(rebel);
    });

    this.setState({
      rebels: rebels
    });
  }.bind(this));

  // this.awardedZonks = firebase.database().ref('awardedZonks');
  // this.awardedZonks.on('value', function(dataSnapshot) {
  // dataSnapshot.forEach(function(childSnapshot) {
  //   var childKey = childSnapshot.key;
  //   for (var i = 0; i < rebels.length; i++) {
  //     if (rebels[i].zonks.hasOwnProperty(childKey)) {
  //       var awardedZonk = childSnapshot.val();
  //       rebels[i].zonksList.push(awardedZonk);
  //     }
  //   }
  // });
  //
  // });

},

  render() {
    return (
      <div className="App">
        <div><RebelsList rebels={this.state.rebels} /></div>
      </div>
    );
  }

})

export default Rebels;
