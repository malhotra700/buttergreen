export default (
    state = { isSignedIn: false, userId: null, photoURL: "untitled.png" },
    action
  ) => {
    switch (action.type) {
      case "SIGN_IN":
        return {
          isSignedIn: true,
          userId: action.payload.userId,
          photoURL: action.payload.photoURL,
        };
      case "SIGN_OUT":
        return { isSignedIn: false, userId: null, photoURL: "untitled.png" };
      default:
        return state;
    }
  };
  