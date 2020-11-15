import Axios from "axios";
import { axiosFetcher, axiosSender } from "../../../api/fetcher";
import {
  clearAllErrors,
  setLoading,
  setLoadingModal,
} from "../uiActions/uiActions";
import {
  addSay,
  deleteSay,
  likeSay,
  setLoadingData,
  setSayings,
  setSingleSay,
  unlikeSay,
} from "./dataActions";

export const axiosGetSayings = () => async (dispatch) => {
  dispatch(setLoadingData());
  try {
    const data = await axiosFetcher("sayings");
    dispatch(setSayings(data.sayings));
  } catch (err) {
    console.log(err);
  }
};

export const axiosGetSingleSay = (sayId: string) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const singleSay = await axiosFetcher(`sayings/${sayId}`);
    dispatch(setSingleSay(singleSay.data));
    dispatch(setLoading());
  } catch (err) {
    console.log(err);
  }
};

//like say
export const axiosLikeSay = (sayId) => async (dispatch) => {
  try {
    //const data = await axiosFetcher(`sayings/${sayId}/like`);

    const res = await Axios(`api/sayings/${sayId}/like`);
    dispatch(likeSay(res.data.data));
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
    const resSay = await axiosSender(say, "sayings");
    console.log(resSay);
    dispatch(addSay(resSay.data));
    dispatch(clearAllErrors());
  } catch (err) {
    console.log(err);
  }
};
