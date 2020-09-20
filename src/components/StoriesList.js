import React, { Component } from "react";
import "../css/StoriesList.css";
import { Link } from "react-router-dom";
import {
  fetchSavedStories,
} from "../actions/index";
import { connect } from "react-redux";
import Firebase from 'firebase';

class StoriesList extends Component {
  componentDidMount(){
    //if(prevprops.auth.userId !== this.props.auth.userId)
      this.props.fetchSavedStories(this.props.auth.userId);
  }
  agoTimeHelper = (difference) => {
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    if (daysDifference === 0) {
      if (hoursDifference === 0) {
        if (minutesDifference === 0) {
          return "A few moments ago";
        } else {
          if (minutesDifference === 1) return "a minute ago";
          return minutesDifference + " minutes ago";
        }
      } else {
        if (hoursDifference === 1) return "an hour ago";
        return hoursDifference + " hours ago";
      }
    } else {
      if (daysDifference === 1) return "a day ago";
      return daysDifference + " days ago";
    }
  };

  savedIconHandler(storyId){
    if(this.props.saved.includes(storyId))
    return <i className="bookmark saved icon" onClick={()=>this.addSavedStory(storyId,true)}></i>;
    else
    return <i className="bookmark saved outline icon" onClick={()=>this.addSavedStory(storyId,false)}></i>;
  };

  addSavedStory(storyId,alreadyThere){
    //console.log("Clicked");
    if(this.props.auth.userId){
      let ref = Firebase.database().ref(`/${this.props.auth.userId}/`);
      let prevSaved=this.props.saved;
      if(alreadyThere){
        const index = prevSaved.indexOf(storyId);
        if (index > -1) {
          prevSaved.splice(index, 1);
        }
      }
      else
        prevSaved.push(storyId);
      ref.set(prevSaved);
  }
  }

  renderList(stories) {
    //console.log(stories);
    var date = new Date();
    var timestamp = date.getTime();
    return stories.map((story) => {
      //console.log(story);
      var difference = timestamp - story.time * 1000;
      var comments = 0;
      let commentsLink = "0";
      if (story.hasOwnProperty("kids")) {
        comments = story.kids.length;
        commentsLink = <Link to={`/comments/${story.id}`}>{comments}</Link>;
      }
      return (
        <div
          className="event ui segment"
          key={story.id}
          style={{
            backgroundColor: "#edf5e1",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          <div className="content">
            <div className="summary">
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                <h3 style={{ color: "#05386b" }}>{story.title}</h3>
              </a>
              <div className="extra text date">
                <a href={story.url} target="_blank" rel="noopener noreferrer">
                  {story.url}
                </a>
              </div>
            </div>
            <div
              className="meta ui five column grid container"
              style={{ margin: "auto" }}
            >
              <div className="extra text column">{story.by}</div>
              <div className="date column">
                {this.agoTimeHelper(difference)}
              </div>
              <div className="meta column">
                <i className="comment outline icon"></i>
                {commentsLink}
              </div>
              <div className="meta like column" style={{ color: "#db2828" }}>
                <i className="like red icon"></i>
                {story.score}
              </div>
              <div className="column">
                {this.savedIconHandler(story.id)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui relaxed divided list">
        {this.renderList(this.props.stories)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    auth: state.authentication,
    saved: state.saved
  };
};

export default connect(mapStateToProps, {
  fetchSavedStories,
})(StoriesList);
