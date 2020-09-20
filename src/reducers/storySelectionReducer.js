export default (state = { type: "topstories" }, action) => {
    if (action.type === "STORY_TYPE_SELECTION") {
      return action.payload;
    }
    return state;
  };
  