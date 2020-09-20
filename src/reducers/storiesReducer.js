export default (state = { result: [], currentPage: 1,isFetching: true }, action) => {
    if (action.type === "DISPLAY_STORIES") {
      return action.payload;
    }
    return state;
  };
  