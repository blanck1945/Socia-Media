import * as NavigationTypes from "../../types";

export const setNavUser = (navUser: any) => ({
  type: NavigationTypes.SET_NAV_USER,
  payload: navUser,
});

export const setNavSay = (navSay: any) => ({
  type: NavigationTypes.SET_NAV_SAY,
  payload: navSay,
});
