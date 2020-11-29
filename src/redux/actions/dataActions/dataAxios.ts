import Axios from "axios";
import { Dispatch } from "react";
import { axiosFetcher, axiosSender } from "../../../api/fetcher";
import { setGlobalLoadingOff, setLoadingModal } from "../uiActions/uiActions";
import {
  addNewComment,
  addSay,
  deleteSay,
  likeSay,
  SayInterface,
  setComments,
  setLoadingData,
  setOwnSayings,
  setSayings,
  setSearchResult,
  setSingleSay,
  unlikeSay,
} from "./dataActions";

interface OwnSayingsRespose {
  ownSays: SayInterface[];
  msg: String;
  state: boolean;
}

export const AxiosGetOwnSayings = () => async (dispatch) => {
  try {
    const data: OwnSayingsRespose = await axiosFetcher("user/sayings");
    await dispatch(setOwnSayings(data.ownSays));
    //dispatch(setGlobalLoadingOff());
  } catch (err) {
    dispatch(setGlobalLoadingOff());
  }
};

export const axiosGetSayings = () => async (dispatch) => {
  try {
    const data = await axiosFetcher("sayings");
    dispatch(setSayings(data.sayings));
    dispatch(setGlobalLoadingOff());
  } catch (err) {
    console.log(err);
  }
};

export const axiosGetSingleSay = (sayId: string) => async (dispatch) => {
  try {
    const singleSay = await axiosFetcher(`sayings/${sayId}`);
    dispatch(setSingleSay(singleSay.data));
  } catch (err) {
    console.log(err);
  }
};

interface SearchResponse {
  msg: string;
  searchResult: any;
}

export const AxiosFindUser = (searchValue: string, router: any) => async (
  dispatch
) => {
  try {
    const data: SearchResponse = await axiosFetcher(
      "user/search/" + searchValue
    );
    console.log(data.searchResult);
    dispatch(setSearchResult(data.searchResult.docs));
    router.push("/search");
  } catch (err) {
    console.log(err);
  }
};

interface AxiosLikeResponse {
  mongoSay: SayInterface;
  msg: string;
}

//like say
export const axiosLikeSay = (sayId) => async (dispatch) => {
  try {
    const data: AxiosLikeResponse = await axiosFetcher(`sayings/${sayId}/like`);
    console.log(data);
    dispatch(likeSay(data.mongoSay));
  } catch (err) {
    console.log(err);
  }
};

//unlike say
export const axiosUnLikeSay = (sayId) => async (dispatch) => {
  try {
    //const data = await axiosFetcher(`sayings/${sayId}/like`);
    const res = await Axios(`api/sayings/${sayId}/unlike`);
    dispatch(unlikeSay(res.data.data));
  } catch (err) {
    console.log(err.response.msg);
  }
};

export const axiosDeleteSay = (sayId) => async (dispatch) => {
  await Axios.delete(`api/sayings/${sayId}`);
  dispatch(deleteSay(sayId));
};

export const axiosPostSay = (say) => async (dispatch) => {
  dispatch(setLoadingModal());
  try {
    const data = await axiosSender(say, "sayings/post");
    dispatch(addSay(data.say));
  } catch (err) {
    console.log(err);
  }
};

export const axiosGetComments = (sayId) => async (dispatch) => {
  try {
    const res = await axiosFetcher(`sayings/${sayId}/comment`);
    console.log(res);
    dispatch(setComments(res.comments));
  } catch (err) {
    console.log(err);
  }
};

interface Comment {
  comment: "";
}

export const AxiosPostComment = (comment: Comment, sayId: string) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const data = await axiosSender(comment, `sayings/${sayId}/comment`);
    dispatch(addNewComment(data.comment));
  } catch (err) {
    return {
      state: false,
      msg: "Error",
      err: err,
    };
  }
};
