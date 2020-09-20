import React, { Component } from "react";
import { fetchingComments,displayComments } from "../actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../css/CommentsList.css";
import Loader from "./Loader";

class CommentsList extends Component {
  componentDidMount() {
    //console.log(this.props.storyId);
    this.props.fetchingComments();
    this.props.displayComments(this.props.storyId);
  }

  componentDidUpdate(prevprops) {
    //console.log(prevprops.storyId, this.props.storyId);
    if (prevprops.storyId !== this.props.storyId){
      this.props.fetchingComments();
      this.props.displayComments(this.props.storyId);
    }
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

  renderComments(comments) {
    //console.log(comments);
    var date = new Date();
    var timestamp = date.getTime();
    return comments.map((comment) => {
      if (comment.deleted) {
        return null;
      }
      var difference = timestamp - comment.time * 1000;
      var replies = 0;
      let repliesLink = "0";
      let text = "";
      if (comment.hasOwnProperty("kids")) {
        replies = comment.kids.length;
        repliesLink = <Link to={`/comments/${comment.id}`}>{replies}</Link>;
      }
      if (comment.hasOwnProperty("text")) {
        text = comment.text.replace(/<(.|\n)*?>/g, "");
      }
      return (
        <div
          className="event ui segment"
          key={comment.id}
          style={{
            backgroundColor: "#edf5e1",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          <div className="content">
            <div className="summary">{text}</div>
            <div
              className="meta ui five column grid container"
              style={{ margin: "auto" }}
            >
              <div className="extra text column">{comment.by}</div>
              <div className="date column">
                {this.agoTimeHelper(difference)}
              </div>
              <div className="meta column">
                <i className="comment outline icon"></i>
                {repliesLink}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  loaderHandler=()=>{
    if(this.props.loading)
    return <Loader/>;
    else 
    return (
      <div className="bg">
        <div className="ui relaxed divided list">
          {this.renderComments(this.props.comments)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.loaderHandler()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  return {
    storyId: ownProps.match.params.id,
    comments: state.comments.result,
    loading: state.comments.isFetching,
  };
};

export default connect(mapStateToProps, { fetchingComments,displayComments })(CommentsList);
