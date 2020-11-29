import * as UiTypes from "../../types";

export interface SET_GLOBAL_LOADING_ACTION_TYPE {
  type: typeof UiTypes.SET_GLOBAL_LOADING;
}

export interface SET_CONGRATZ_MSG_ACTION_TYPE {
  type: typeof UiTypes.SET_CONGRATZ_MSG;
}

export interface SET_SIGN_LOADING_ACTION_TYPE {
  type: typeof UiTypes.SET_SIGN_LOADING;
}

export interface LOADING_MODEL_ACTION_TYPE {
  type: typeof UiTypes.SET_LOADING_MODAL;
}

export interface TOOGLE_MODAL_ACTION_TYPE {
  type: typeof UiTypes.TOOGLE_MODAL;
}

export interface SET_HOME_VIEW_ACTION_TYPE {
  type: typeof UiTypes.SET_HOME_VIEW;
}

export interface CLEAR_HOME_VIEW_ACTION_TYPE {
  type: typeof UiTypes.CLEAR_HOME_VIEW;
}

export type UIActionTypes =
  | SET_GLOBAL_LOADING_ACTION_TYPE
  | SET_SIGN_LOADING_ACTION_TYPE
  | TOOGLE_MODAL_ACTION_TYPE
  | LOADING_MODEL_ACTION_TYPE
  | SET_HOME_VIEW_ACTION_TYPE
  | CLEAR_HOME_VIEW_ACTION_TYPE
  | SET_CONGRATZ_MSG_ACTION_TYPE;
