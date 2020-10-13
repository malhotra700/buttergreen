import React, { Component } from "react";
import SearchBar from "./SearchBar";
import StoriesList from "./StoriesList";
import BottomNavBar from "./BottomNavBar";
import CommentsList from "./CommentsList";
import FilterPopup from "./FilterPopup";
import "../css/App.css";

import {
  displayStories,
  fetchingStories,
  fetchSavedStories,
  sortTypeSelection,
  storyTypeSelection,
  searchStories,
} from "../actions/index";
import { connect } from "react-redux";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loader from "./Loader";

class App extends Component {
  componentDidMount() {
    this.props.fetchingStories(this.props.currentPage);
    this.props.displayStories(this.props.currentPage, this.props.storyType);
  }

  componentDidUpdate(prevprops) {
    //console.log(prevprops.storyId, this.props.storyId);
    if (prevprops.storyType !== this.props.storyType){
      if(this.props.storyType !== "saved"){
        this.props.fetchingStories(this.props.currentPage);
        this.props.displayStories(this.props.currentPage, this.props.storyType);
      }
      else{
        this.props.fetchingStories(this.props.currentPage);
        this.props.displayStories(this.props.currentPage, this.props.storyType,this.props.saved);
      }
    }
  }

  filterDisplayHandler = (flag) => {
    if (flag)
      return (
        <div className="filterlayout">
          <FilterPopup
            sort={this.props.sortTypeSelection}
            storyType={this.props.storyTypeSelection}
          />
        </div>
      );
    else return null;
  };

  onSearchSubmit = async (term) => {
    //console.log(term);
    this.props.searchStories(term);
  };

  loadingHandler = (sortedStories) => {
    if(this.props.loading)
    return (
      <div className="main1">
          {this.filterDisplayHandler(this.props.flag)}
          <Loader/>
      </div>
    );
    else
    return (
      <div className="main">
          {this.filterDisplayHandler(this.props.flag)}
          <StoriesList stories={sortedStories} />
      </div>
    );
  }

  storiesHelper = () => {
    //console.log(this.props.stories);
    let sortedStories = this.props.stories;
    switch (this.props.sortType) {
      default:
      case "popularity":
        sortedStories.sort((a, b) => (a.score > b.score ? -1 : 1));
        break;
      case "title":
        sortedStories.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
    }
    sortedStories = sortedStories.filter((story) => {
      return (story.title + " " + story.by)
        .toLowerCase()
        .includes(this.props.searchTerm.toLowerCase());
    });
    return (
      <div>
        <div className="navbar">
          <SearchBar onSubmit={this.onSearchSubmit} />
        </div>
        {this.loadingHandler(sortedStories)}
        <div className="bottombar">
          <BottomNavBar
            storyType={this.props.storyType}
            fetching={this.props.fetchingStories}
            page={this.props.displayStories}
            currentPage={this.props.currentPage}
          />
        </div>
      </div>
    );
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Switch>
              <Route path="/" exact component={this.storiesHelper} />
              <Route path="/comments/:id" exact component={CommentsList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    auth: state.authentication,
    saved: state.saved,
    loading: state.stories.isFetching,
    stories: state.stories.result,
    currentPage: state.stories.currentPage,
    flag: state.filter.flag,
    sortType: state.sort.sortType,
    storyType: state.storyType.type,
    searchTerm: state.search.searchTerm,
  };
};

export default connect(mapStateToProps, {
  displayStories,
  fetchingStories,
  fetchSavedStories,
  sortTypeSelection,
  storyTypeSelection,
  searchStories,
})(App);
