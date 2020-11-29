import { SayInterface } from "../actions/dataActions/dataActions";
import * as NavTypes from "../types";

export interface NavInitialState {
  navUser: any;
  navSay: SayInterface[];
}

const navInitialState: NavInitialState = {
  navUser: undefined,
  navSay: undefined,
};

const NavReducer = (state = navInitialState, action: any) => {
  switch (action.type) {
    case NavTypes.SET_NAV_USER:
      return {
        ...state,
        navUser: action.payload,
      };
    case NavTypes.SET_NAV_SAY:
      return {
        ...state,
        navSay: action.payload,
      };
    default:
      return state;
  }
};

export default NavReducer;
