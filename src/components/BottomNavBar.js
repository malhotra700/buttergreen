import React, { Component } from "react";
import "../css/BottomNavBar.css";
import { connect } from "react-redux";

class BottomNavBar extends Component {
  classNameHelper = (page) => {
    if (page === this.props.currentPage) return "active active1 item";
    else return "normal item";
  };
  render() {
    return (
      <div className="bottomnavbar">
        <div className="ui pagination flex-wrap menu">
          <div
            className={this.classNameHelper(1)}
            onClick={() => this.props.page(1, this.props.storyType,this.props.saved)}
          >
            1
          </div>
          <div
            className={this.classNameHelper(2)}
            onClick={() => this.props.page(2, this.props.storyType,this.props.saved)}
          >
            2
          </div>
          <div
            className={this.classNameHelper(3)}
            onClick={() => this.props.page(3, this.props.storyType,this.props.saved)}
          >
            3
          </div>
          <div
            className={this.classNameHelper(4)}
            onClick={() => this.props.page(4, this.props.storyType,this.props.saved)}
          >
            4
          </div>
          <div
            className={this.classNameHelper(5)}
            onClick={() => this.props.page(5, this.props.storyType,this.props.saved)}
          >
            5
          </div>
          <div
            className={this.classNameHelper(6)}
            onClick={() => this.props.page(6, this.props.storyType,this.props.saved)}
          >
            6
          </div>
          <div
            className={this.classNameHelper(7)}
            onClick={() => this.props.page(7, this.props.storyType,this.props.saved)}
          >
            7
          </div>
          <div
            className={this.classNameHelper(8)}
            onClick={() => this.props.page(8, this.props.storyType,this.props.saved)}
          >
            8
          </div>
          <div
            className={this.classNameHelper(9)}
            onClick={() => this.props.page(9, this.props.storyType,this.props.saved)}
          >
            9
          </div>
          <div
            className={this.classNameHelper(10)}
            onClick={() => this.props.page(10, this.props.storyType,this.props.saved)}
          >
            10
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    saved: state.saved,
  };
};

export default connect(mapStateToProps, {})(BottomNavBar);
