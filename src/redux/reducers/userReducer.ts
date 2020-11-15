import { USER_Action_Types } from "../actions/userActions/userInterfaces";
import * as UserTypes from "../types";

interface Like {
  user: string;
  sayId: string;
}

interface UserInterface {}

export interface UserInitialState {
  authenticateUser: boolean;
  credentials: any;
  loading: boolean;
  likes: [Like];
  notifications: [string];
}

const userInitialState: UserInitialState = {
  authenticateUser: false,
  credentials: "",
  loading: false,
  likes: undefined,
  notifications: undefined,
};

const UserReducer = (
  state = userInitialState,
  action: USER_Action_Types | any
) => {
  switch (action.type) {
    case UserTypes.UNAUTHENTICATED:
      return userInitialState;
    case UserTypes.SET_USER_DATA:
      return {
        ...state,
        authenticateUser: true,
        credentials: action.payload.credentials,
        likes: action.payload.likes,
        loading: false,
      };
    case UserTypes.LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case UserTypes.LIKE_SAY:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            sayId: action.payload.sayingId,
            user: state.credentials.user,
          },
        ],
      };
    case UserTypes.UNLIKE_SAY:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like?.sayId !== action.payload.sayingId
        ),
      };

    default:
      return state;
  }
};

export default UserReducer;
