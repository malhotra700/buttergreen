import React, { Component } from "react";

import { connect } from "react-redux";

class FilterPopup extends Component {
  onChangeValue = (event) => {
    this.props.sort(event.target.value);
  };
  onChangeStoryValue = (event) => {
    this.props.storyType(event.target.value);
  };

  savedColumn = () => {
    if (this.props.isSignedIn) 
    return (
      <div className="column">
        <div className="ui form">
          <div
            className="grouped fields"
            onChange={this.onChangeStoryValue}
          >
            <h4>Saved</h4>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" value="saved" name="storyType" />
                <label>View Saved</label>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
    else return null;
  };

  render() {
    return (
      <div className="ui fluid">
        <div className="ui four column relaxed equal height divided grid">
          <div className="column">
            <div className="ui form">
              <div className="grouped fields" onChange={this.onChangeValue}>
                <h4>Sort By</h4>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      value="popularity"
                      name="sort"
                      defaultChecked="false"
                    />
                    <label>Popularity</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" value="title" name="sort" />
                    <label>Title</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="ui form">
              <div
                className="grouped fields"
                onChange={this.onChangeStoryValue}
              >
                <h4>Stories</h4>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      value="topstories"
                      name="storyType"
                      defaultChecked="false"
                    />
                    <label>Top Stories</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" value="newstories" name="storyType" />
                    <label>New Stories</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" value="beststories" name="storyType" />
                    <label>Best Stories</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="ui form">
              <div
                className="grouped fields"
                onChange={this.onChangeStoryValue}
              >
                <h4>HN</h4>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" value="askstories" name="storyType" />
                    <label>Ask HN</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" value="showstories" name="storyType" />
                    <label>Show HN</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.savedColumn()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    isSignedIn: state.authentication.isSignedIn,
  };
};

export default connect(mapStateToProps, {})(FilterPopup);
