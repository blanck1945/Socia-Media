import * as DataTypes from "../../types";
import { CommentInterface, SayInterface } from "./dataActions";

export interface SET_SAYINGS_ACTION_TYPE {
  type: typeof DataTypes.SET_SAYINGS;
  payload: SayInterface[];
}

export interface SET_OWN_SAYINGS_ACTION_TYPE {
  type: typeof DataTypes.SET_OWN_SAYINGS;
  payload: SayInterface[];
}

export interface SINGLE_SAY_ACTION_TYPE {
  type: typeof DataTypes.SET_ONE_SAY;
  payload: SayInterface;
}

export interface LIKE_SAY_ACTION_TYPE {
  type: typeof DataTypes.LIKE_SAY;
  payload: SayInterface;
}

export interface UNLIKE_SAY_ACTION_TYPE {
  type: typeof DataTypes.UNLIKE_SAY;
  payload: SayInterface;
}

export interface DELETE_SAY_ACTION_TYPE {
  type: typeof DataTypes.DELETE_SAY;
  payload: string;
}

export interface POST_SAY_ACTION_TYPE {
  type: typeof DataTypes.POST_SAY;
  payload: any;
}

export interface CLEAR_COMMENTS_ACTION_TYPE {
  type: typeof DataTypes.CLEAR_COMMENTS;
}

export interface ADD_NEW_COMMENT_ACTION_TYPE {
  type: typeof DataTypes.ADD_NEW_COMMENT;
  payload: CommentInterface;
}

export type DataActionTypes =
  | LIKE_SAY_ACTION_TYPE
  | UNLIKE_SAY_ACTION_TYPE
  | DELETE_SAY_ACTION_TYPE
  | POST_SAY_ACTION_TYPE
  | CLEAR_COMMENTS_ACTION_TYPE
  | ADD_NEW_COMMENT_ACTION_TYPE
  | SET_OWN_SAYINGS_ACTION_TYPE;
