export default (state = { flag: false }, action) => {
    if (action.type === "DISPLAY_FILTER") {
      return action.payload;
    }
    return state;
  };
  