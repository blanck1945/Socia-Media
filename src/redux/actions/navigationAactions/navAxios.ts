import { NextRouter } from "next/router";
import { Dispatch } from "redux";
import { axiosFetcher } from "../../../api/fetcher";
import { SayInterface } from "../dataActions/dataActions";
import { setGlobalLoadingOff } from "../uiActions/uiActions";
import { setNavSay, setNavUser } from "./navigationActions";

export const AxiosGetNavSays = (userName: string, router: NextRouter) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const navSays = await axiosFetcher(`user/nav/${userName}`);
    console.log(navSays);
    await dispatch(setNavSay(navSays.navSayings.docs));
    router.push(`/usuario/${userName}`);
  } catch (err) {
    console.log(err);
  }
};

interface NavUserResponse {
  msg: string;
  userSays: any;
  mongoUser: any;
}

export const AxiosGetNavUser = (user: string | string[]) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const data: NavUserResponse = await axiosFetcher(`user/${user}`);
    dispatch(setNavUser(data.mongoUser));
    dispatch(setNavSay(data.userSays.docs));
    dispatch(setGlobalLoadingOff());
  } catch (err) {
    console.log(err);
  }
};
