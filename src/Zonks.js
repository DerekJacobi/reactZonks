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

class ZonksList extends React.Component {
  render() {
    var createZonk = function(zonk, index){
      return (
      <li key={index} className="zonk-li">
          <div className="panel panel-default zonk-div">
            <div className="panel-heading">
              <h3 className="panel-title">{zonk.name}</h3>
            </div>
          <div className="panel-body">
            <img className="zonk-img" src={zonk.image} alt="Zonk" />
            <ul className="list-group">
              <li className="list-group-item">
                <span className="badge">{zonk.timesawarded}</span>Awarded:
              </li>
           </ul>
        <div className="well well-sm">{zonk.description}</div>
      </div>
    </div>
  </li>
      );
    };
    return <div id="zonk-list">
            <ul className="zonk-ul">{ this.props.zonks.map(createZonk) }</ul>
          </div>;
  }
}

var Zonks = React.createClass ({

  getInitialState: function() {
    return {
      zonks: []
    };
  },

  componentWillMount: function() {
    this.zonks = firebase.database().ref('zonks');
    var zonks = [];
    this.zonks.on('value', function(dataSnapshot) {
    dataSnapshot.forEach(function(childSnapshot) {
      var zonk = childSnapshot.val();
      zonks.push(zonk);
    });

      this.setState({
        zonks: zonks
      });
    }.bind(this));
},

  render() {
    return (
      <div className="App">
        <div><ZonksList zonks={this.state.zonks} /></div>
      </div>
    );
  }

})

export default Zonks;
