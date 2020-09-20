export default (state = [], action) => {
    if (action.type === "SAVED_STORIES") {
      return action.payload;
    }
    return state;
  };
  