import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { Firebase } from "../apis/firebase";

import { signIn, signOut } from "../actions";
import { connect } from "react-redux";

class Auth extends Component {
  componentDidMount() {
    //firebase.initializeApp(firebaseConfig);
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log(user.photoURL);
        this.props.signIn(user.uid, user.photoURL);
      } else {
        this.props.signOut();
      }
    });
  }

  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const auth = firebase.auth();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        //console.log(auth.currentUser);
        this.props.signIn(auth.currentUser.uid, auth.currentUser.photoURL);
      })
      .catch(function (error) {
        console.log(error);
      });

    //console.log(auth);
  };

  signOutOfGoogle = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.props.signOut();
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  render() {
    if (!this.props.isSignedIn) {
      return (
        <div
          className="ui large image label"
          style={{ backgroundColor: "#05386b", color: "white",cursor: "pointer" }}
          onClick={() => this.signInWithGoogle()}
        >
          Sign In
        </div>
      );
    } else {
      return (
        <div
          className="ui large image label"
          style={{ display:"flex", backgroundColor: "#05386b", color: "white" ,cursor: "pointer"}}
          onClick={() => this.signOutOfGoogle()}
        >
          <img className="ui avatar image" src={this.props.photoURL} alt="" />
          Sign Out
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    isSignedIn: state.authentication.isSignedIn,
    photoURL: state.authentication.photoURL,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(Auth);
