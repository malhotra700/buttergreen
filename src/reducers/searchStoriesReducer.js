export default (state = { searchTerm: "" }, action) => {
    if (action.type === "SEARCH_STORIES") {
      return action.payload;
    }
  
    return state;
  };
  