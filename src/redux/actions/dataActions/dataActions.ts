import * as DataTypes from "../../types";

export interface SayInterface {
  sayingId: string;
  user: string;
  body: string;
  createdAt: string;
  userImage: string;
  likeCount: number;
  commentCount: number;
}

export const setSayings = (payload: SayInterface[]) => ({
  type: DataTypes.SET_SAYINGS,
  payload: payload,
});

export const setSingleSay = (payload: SayInterface) => ({
  type: DataTypes.SET_ONE_SAY,
  payload: payload
});

export const likeSay = (payload) => ({
  type: DataTypes.LIKE_SAY,
  payload: payload,
});

export const unlikeSay = (payload) => ({
  type: DataTypes.UNLIKE_SAY,
  payload: payload,
});

export const setLoadingData = () => ({
  type: DataTypes.SET_LOADING_DATA,
});

export const deleteSay = (sayId: string) => ({
  type: DataTypes.DELETE_SAY,
  payload: sayId,
});

export const addSay = (say: any) => ({
  type: DataTypes.POST_SAY,
  payload: say,
});
