import React, { Component } from "react";
import "../css/SearchBar.css";
import Auth from "./Auth";

import { displayFilter } from "../actions/index";
import { connect } from "react-redux";

class SearchBar extends Component {
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(event.target.value);
  };

  mouseClickHandler = () => {
    //console.log(this.props.flag);
    if (this.props.flag) this.props.displayFilter(false);
    else this.props.displayFilter(true);
  };

  render() {
    return (
      <div
        className="ui segment container1"
        style={{ backgroundColor: "#5cdb95" }}
      >
        <div className="butter">
          <h1 className="h1">butter HN</h1>
        </div>
        <div className="ui form searchbar">
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search stories by title or author"
              onChange={this.onFormSubmit}
            />
            <i className="circular search icon"></i>
          </div>
          <button className="btn" onClick={this.mouseClickHandler}>
            <i className="sliders horizontal icon big filter"></i>
          </button>
        </div>
        <div className="auth">
          <Auth />
        </div>
      </div>
    );
  }
}

const mapStateToprops = (state) => {
  //console.log(state);
  return { flag: state.filter.flag };
};

export default connect(mapStateToprops, { displayFilter })(SearchBar);
