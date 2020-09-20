import { combineReducers } from "redux";
import storiesReducer from "./storiesReducer";
import commentsReducer from "./commentsReducer";
import filterReducer from "./filterReducer";
import sortSelectionReducer from "./sortSelectionReducer";
import storySelectionReducer from "./storySelectionReducer";
import searchStoriesReducer from "./searchStoriesReducer";
import signInReducer from "./signInReducer";
import savedStoriesReducer from "./savedStoriesReducer";

export default combineReducers({
  saved: savedStoriesReducer,
  authentication: signInReducer,
  stories: storiesReducer,
  comments: commentsReducer,
  filter: filterReducer,
  sort: sortSelectionReducer,
  storyType: storySelectionReducer,
  search: searchStoriesReducer,
});
