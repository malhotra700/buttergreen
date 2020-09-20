export default (state = { sortType: "popularity" }, action) => {
    if (action.type === "SORT_TYPE_SELECTION") {
      return action.payload;
    }
    return state;
  };
  