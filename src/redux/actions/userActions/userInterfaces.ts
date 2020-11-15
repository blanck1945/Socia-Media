import * as UserTypes from "../../types";
import { FBUserRespose } from "./userActions";

interface SET_USER_DATA_ACTION_TYPE {
  type: typeof UserTypes.SET_USER_DATA;
  payload: FBUserRespose;
}

interface UNAUTHENTICATED_ACTION_TYPE {
  type: typeof UserTypes.UNAUTHENTICATED;
}

interface LOADING_USER_ACTION_TYPE {
  type: typeof UserTypes.LOADING_USER;
}

export type USER_Action_Types =
  | SET_USER_DATA_ACTION_TYPE
  | UNAUTHENTICATED_ACTION_TYPE
  | LOADING_USER_ACTION_TYPE;
