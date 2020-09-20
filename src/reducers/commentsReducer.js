export default (state = { result: [],isFetching: true}, action) => {
    if (action.type === "DISPLAY_COMMENTS") {
      return action.payload;
    }
    return state;
  };
  