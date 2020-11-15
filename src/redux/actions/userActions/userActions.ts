import * as UserTypes from "../../types";

export interface FBUser {
  userId: string;
  email: string;
  user: string;
  createdAt: string;
  imageUrl: string;
  bio: string;
  website: string;
  location: string;
}

export interface FBUserRespose {
  credentials: FBUser;
  msg: string;
  likes: [string];
}

export const setUserData = (payload: FBUserRespose) => ({
  type: UserTypes.SET_USER_DATA,
  payload: payload,
});

export const setUnauthenticated = () => ({
  type: UserTypes.UNAUTHENTICATED,
});

export const setLoadingUser = () => ({
  type: UserTypes.LOADING_USER,
});
