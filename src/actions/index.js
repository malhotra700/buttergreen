import stories from "../apis/stories";
import Firebase from 'firebase';

export const signIn = (userId, photoURL) => {
  return {
    type: "SIGN_IN",
    payload: { userId, photoURL },
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const displayFilter = (flag) => {
  return {
    type: "DISPLAY_FILTER",
    payload: { flag },
  };
};

export const sortTypeSelection = (sortType) => {
  return {
    type: "SORT_TYPE_SELECTION",
    payload: { sortType },
  };
};

export const storyTypeSelection = (storyType) => {
  return {
    type: "STORY_TYPE_SELECTION",
    payload: { type: storyType },
  };
};

export const searchStories = (term) => {
  return {
    type: "SEARCH_STORIES",
    payload: { searchTerm: term },
  };
};

export const fetchingStories = (page) =>{
  return {
    type: "DISPLAY_STORIES",
    payload: { result: [], currentPage: page ,isFetching: true},
  };
};

export const fetchSavedStories = (userId) => {
  //console.log("Fetching");
  if(userId){
    //console.log("Not Null");
    return async (dispatch) => {
      let ref = Firebase.database().ref(`/${userId}/`);
      let state=[];
      ref.on('value', snapshot => {
        state = snapshot.val();
        //console.log(state);
        if(state === null)
          state=[];
        dispatch({
          type: "SAVED_STORIES",
          payload: state
        });
      },errorObject => {
        //console.log("The read failed: " + errorObject.code);
        dispatch({
          type: "SAVED_STORIES",
          payload: []
        });
      });
    };
}
else{
  return {
    type: "SAVED_STORIES",
    payload: []
  };
}
};

export const displayStories = (page, storyType, saved=[]) => {
  //console.log(page,storyType,saved);
  return async (dispatch) => {
    let storyIds=[];
    if(storyType !== "saved"){
      const response = await stories.get(`${storyType}.json`);
      storyIds = response.data;
    }
    else
      storyIds=saved;
    //console.log(storyIds);
    const promises = storyIds
      .slice((page - 1) * 20, page * 20)
      .map((id) =>
        stories.get(`item/${id}.json`).then((response) => response.data)
      );
    const result = await Promise.all(promises);
    //result.sort((a, b) => (a.score > b.score ? -1 : 1));
    dispatch({
      type: "DISPLAY_STORIES",
      payload: { result: result, currentPage: page ,isFetching: false},
    });
  };
};

export const fetchingComments = () =>{
  return {
    type: "DISPLAY_COMMENTS",
    payload: { result: [],isFetching: true},
  };
};

export const displayComments = (id) => {
  return async (dispatch) => {
    const response = await stories.get(`item/${id}.json`);
    if (response.data.hasOwnProperty("kids")) {
      const commentIds = response.data.kids;
      const promises = commentIds.map((id) =>
        stories.get(`item/${id}.json`).then((response) => response.data)
      );
      const result = await Promise.all(promises);
      //console.log(result);
      dispatch({
        type: "DISPLAY_COMMENTS",
        payload: {result:result,isFetching:false}
      });
    }
  };
};
